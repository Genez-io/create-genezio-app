import { Command, CommanderError } from "commander";
import { exit } from "process";
import { CREATE_GENEZIO_APP, DEFAULT_PROJECT_CONFIGURATION, DEFAULT_PROJECT_OPTIONS } from "../consts.js";
import { promptAppName, promptBackendLanguage, promptFrontendFramework, promptFrontendLanguage, promptInitGit, promptInstallDependencies } from "./prompts.js";
import { createProjectFromTemplate } from "../helpers/createProject.js";
import { initGitRepository } from "../helpers/initGitRepository.js";
import { installDependencies } from "../helpers/installDependency.js";
import log from "loglevel";
import prefix from 'loglevel-plugin-prefix';
import path from "path";
import { ClassType, CreateProjectOptions } from "../types/ProjectOptions.js";
import { translateFromLongLanguagesToExtensions } from "../utils/translateFromLongLanguagesToExtensions.js";

const program = new Command().name(CREATE_GENEZIO_APP);

// logging setup
log.setDefaultLevel("INFO");
prefix.reg(log);

program
  .description("A CLI tool to create full-stack applications with genezio infrastructure!")
  .exitOverride((err: CommanderError) => {
    if (err.code === "commander.help" || err.code === "commander.version" || err.code === "commander.helpDisplayed") {
      exit(0);
    } else {
      log.error(`Type '${CREATE_GENEZIO_APP} --help'.`);
    }
  })
  .addHelpText("afterAll", " If you have any problems, do not hesitate to file an issue at: https://github.com/genez-io/create-genezio-app/issues/new")
  .argument("[project-directory]", "The name of the application as well as the name of the directory it will be created in.")
  .version("1.0.0")
  .option("--logLevel <logLevel>", "set the log level (default: info)", "info")
  .option("-d, --default", "use default values for all questions")
  .option("-b, --backend-language <backend-language>", "set the programming language of your backend")
  .option("-f, --frontend-language <frontend-language>", "set the programming language of your frontend")
  .action(async (projectDirectory: string, options: { default: boolean; frontendLanguage: string; backendLanguage: string }) => {
    if (options.default) {
       log.info("Using default values to create your project.");

        // Create project
        await createProject(DEFAULT_PROJECT_OPTIONS).catch((error) => {
            log.error(error);
            exit(1);
        });
        return;
    }

    // Retrieve user preferences
    if (!projectDirectory) {
        const appName = await promptAppName()
        .catch((error) => {
            log.error(error);
        });
        log.info(`Creating your project in ${appName}.`);
        projectDirectory = appName;
    }

    const backendLanguage:string = await promptBackendLanguage().catch((error) => {
        log.error(error);
    });
    log.info(`Using ${backendLanguage} as backend language.`);

    const frontendLanguage:string = await promptFrontendLanguage().catch((error) => {
        log.error(error);
    });
    log.info(`Using ${frontendLanguage} as frontend language.`);

    let frontendFramework = "none";
    if (frontendLanguage === "typescript" || frontendLanguage === "javascript") {
        frontendFramework = await promptFrontendFramework().catch((error) => {
            log.error(error);
        });
        log.info(`Using ${frontendFramework} as frontend framework.`);
    }

    // Ask about init git repository
    const initGit = await promptInitGit().catch((error) => {
        log.error(error);
    });

    // Ask about install dependencies
    const installDependencies = await promptInstallDependencies().catch((error) => {
        log.error(error);
    });

    // Create project
    const backendLanguageExtension = await translateFromLongLanguagesToExtensions(backendLanguage);
    await createProject({
        projectName: projectDirectory,
        backendLanguage: backendLanguage,
        frontendLanguage: frontendLanguage,
        frontendFramework: frontendFramework,
        packageManager: DEFAULT_PROJECT_OPTIONS.packageManager,
        authentication: DEFAULT_PROJECT_OPTIONS.authentication,
        database: DEFAULT_PROJECT_OPTIONS.database,
        initGit: initGit,
        installDependencies: installDependencies,
        projectConfiguration: {
            ...DEFAULT_PROJECT_CONFIGURATION,
            classes:[
                {
                    path: path.join(".", "server", "task" +"." + backendLanguageExtension),
                    type: ClassType.JSONRPC,
                },
                {
                    path: path.join(".", "server", "user" +"." + backendLanguageExtension),
                    type: ClassType.JSONRPC,
                }
        ]
        },
    }).catch((error) => {
        log.error(error);
    });
});

async function createProject(options: CreateProjectOptions) {
        // Create project using templates
        await createProjectFromTemplate(options).catch((error) => {
            log.error(error);
        });

        // Install dependencies
        if (options.installDependencies) {
            await installDependencies(options).catch((error) => {
                log.error(error);
            });
        }

        // Init git repository
        if (options.initGit) {
            await initGitRepository(options).catch((error) => {
                log.error(error);
            });
        }
}

export default program;
