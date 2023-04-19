import { Command, CommanderError } from "commander";
import { exit } from "process";
import { CREATE_GENEZIO_APP } from "../consts.js";
import { promptAppName, promptBackendLanguage, promptFrontendFramework, promptFrontendLanguage, promptInitGit } from "./prompts.js";
import { createProject } from "../helpers/createProject.js";
import { initGitRepository } from "../helpers/initGitRepository.js";
import { installDependencies } from "../helpers/installDependency.js";
import log from "loglevel";

const program = new Command().name(CREATE_GENEZIO_APP);

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
  .option("--default", "use default values for all questions")
  .option("-b, --backend-language <backend-language>", "set the programming language of your backend")
  .option("-f, --frontend-language <frontend-language>", "set the programming language of your frontend")
  .action(async (projectDirectory: string, options: { default: boolean; frontendLanguage: string; backendLanguage: string }) => {
    if (options.default) {
       log.info("Use default values for all questions.");
    } else {
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
        if (frontendLanguage.toLowerCase() === "typescript" || frontendLanguage.toLowerCase() === "javascript") {
            frontendFramework = await promptFrontendFramework().catch((error) => {
                log.error(error);
            });
            log.info(`Using ${frontendFramework} as frontend framework.`);
        }

        const initGit = await promptInitGit().catch((error) => {
            log.error(error);
        });
        if (initGit) {
            log.info("Initializing git repository.");
        } else {
            log.info("Not initializing git repository. You can do this later by running `git init` in your project directory.");
        }

        // Create project
        await createProject({
            packageManager: "npm",
            projectName: projectDirectory,
            backendLanguage: backendLanguage,
            frontendLanguage: frontendLanguage,
            frontendFramework: frontendFramework,
        }).catch((error) => {
            log.error(error);
        });

        // Install dependencies
        await installDependencies({
            packageManager: "npm",
            projectName: projectDirectory,
            backendLanguage: backendLanguage,
            frontendLanguage: frontendLanguage,
            frontendFramework: frontendFramework,
        }).catch((error) => {
            log.error(error);
        });

        // Init git repository
        if (initGit) {
            await initGitRepository({
                packageManager: "npm",
                projectName: projectDirectory,
                backendLanguage: backendLanguage,
                frontendLanguage: frontendLanguage,
                frontendFramework: frontendFramework,
            }).catch((error) => {
                log.error(error);
            });
        }
    }
  });

export default program;
