import { Command, CommanderError } from "commander";
import { exit } from "process";
import { CREATE_GENEZIO_APP } from "../consts.js";
import { promptBackendLanguage, promptFrontendFramework, promptFrontendLanguage, promptInitGit, promptInstallDependencies, promptProjectName } from "./prompts.js";
import { createProjectFromTemplate } from "../helpers/createProject.js";
import { initGitRepository } from "../helpers/initGitRepository.js";
import { installDependencies } from "../helpers/installDependency.js";
import log from "loglevel";
import prefix from 'loglevel-plugin-prefix';
import path from "path";
import { BackendOptions, Class, ClassType, CloudProvider, FrontendOptions, ProjectConfigurationOptions, Region, SDKRuntime, ScriptsOptions } from "../types/ProjectOptions.js";
import { createRequire } from "module";

const requireESM = createRequire(import.meta.url);
const pjson = requireESM("../../package.json");
const version = pjson.version;

const program = new Command().name(CREATE_GENEZIO_APP);

// Set log level default to info
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
  .version(version)
  .option("--logLevel <logLevel>", "set the log level (default: info)", "info")
  .action(async (projectDirectory: string) => {
    // If project directory is not provided as a CLI argument, ask the user for it
    if (!projectDirectory) {
        const projectName = await promptProjectName()
        .catch((error) => {
            log.error(error);
        });
        log.info(`Creating your project in ${projectName}.`);
        projectDirectory = projectName;
    }

    // Ask about backend language options
    let backendOptions;
    await getBackendOptions().then((value) => {
        backendOptions = value;
    }).catch((error) => {
        log.error(error);
    });

    // Ask about frontend language options
    let frontendOptions;
    await getFrontendOptions().then((value) => {
        frontendOptions = value;
    }).catch((error) => {
        log.error(error);
    });

    // Ask about initializing a git repository
    const initGit = await promptInitGit().catch((error) => {
        log.error(error);
    });

    // Ask about installing the dependencies
    const installDependencies = await promptInstallDependencies().catch((error) => {
        log.error(error);
    });

    // Create project using templates
    const projectConfiguration: ProjectConfigurationOptions = {
        cloudProvider: CloudProvider.AWS,
        region: Region.US_EAST_1,
        projectName: projectDirectory,
        backendOptions: backendOptions,
        frontendOptions: frontendOptions,
        authentication: "none",
        database: "none",
        initGit: initGit,
        installDependencies: installDependencies,
    };

    // Create project with the given options
    await createProject(projectConfiguration).catch((error) => {
        log.error(error);
    });
});

async function createProject(options: ProjectConfigurationOptions) {
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

async function getBackendOptions(): Promise<BackendOptions | undefined> {
    const backendLanguage:string = await promptBackendLanguage().catch((error) => {
        throw error;
    });

    if (backendLanguage === "none") {
        log.info(`You choose ${backendLanguage} as backend language. We won't create a backend directory for you.`);
        return undefined;
    }

    let packageManager = "";
    let scripts:ScriptsOptions = {};
    let classes: Class[] = [];
    switch (backendLanguage) {
        case "typescript":
            packageManager = "npm";
            scripts = { preBackend: "npm install" };
            classes = [ {path: path.join(".", "task.ts"), name: "", type: ClassType.JSONRPC} ];
            break;
        case "javascript":
            packageManager = "npm";
            scripts = { preBackend: "npm install" };
            classes = [ {path: path.join(".", "task.js"), name: "", type: ClassType.JSONRPC} ];
            break;
        case "dart":
            packageManager = "dart";
            scripts = { preBackend: "dart pub get" };
            classes = [ {path: path.join(".", "lib", "task.dart"), name: "TaskService", type: ClassType.JSONRPC} ];
            break;
        case "none":
            break;
        default:
            throw new Error(`Backend language ${backendLanguage} is not supported.`);
    }

    log.info(`Using ${backendLanguage} as backend language.`);

    return {
        language: backendLanguage,
        packageManager: packageManager,
        classes : classes,
        scripts: scripts,
    };
}

async function getFrontendOptions(): Promise<FrontendOptions | undefined>{
    let frontendLanguage = "";
    let frontendFramework = "";

    if (frontendLanguage === "none") {
        log.info(`You choose ${frontendLanguage} as frontend language. We won't create a frontend directory for you.`);
        return undefined;
    }

    frontendLanguage = await promptFrontendLanguage().catch((error) => {
        throw error;
    });

    let packageManager = "";
    let sdkPath = "";
    let frontendPath = "";
    let scripts:ScriptsOptions = {};
    switch (frontendLanguage) {
        case "typescript":
            frontendFramework = await promptFrontendFramework().catch((error) => {
                throw error;
            });
            packageManager = "npm";
            sdkPath = path.join("..", "client", "src", "sdk");
            frontendPath = path.join("..", "client", "build");
            scripts = { preFrontend: `cd ${path.join("..", "client")} && npm install && npm run build`, };
            break;
        case "javascript":
            frontendFramework = await promptFrontendFramework().catch((error) => {
                throw error;
            });
            packageManager = "npm";
            sdkPath = path.join("..", "client", "src", "sdk");
            frontendPath = path.join("..", "client", "build");
            scripts = { preFrontend: `cd ${path.join("..", "client")} && npm install && npm run build`, };
            break;
        case "dart":
            frontendFramework = "flutter";
            packageManager = "flutter";
            sdkPath = path.join("..", "client", "lib", "sdk");
            frontendPath = path.join("..", "client", "build");
            scripts = { preFrontend: `cd ${path.join("..", "client")} && flutter clean && flutter pub get && flutter build web --web-renderer html`, };
            break;
        case "none":
            break;
        default:
            throw new Error(`Frontend language ${frontendLanguage} is not supported.`);
    }

    log.info(`Using ${frontendLanguage} as frontend language.`);

    return {
        language: frontendLanguage,
        framework: frontendFramework,
        packageManager: packageManager,
        sdkPath: sdkPath,
        sdkLanguage: frontendLanguage,
        sdkRuntime: SDKRuntime.BROWSER,
        frontendPath: frontendPath,
        frontendSubdomain: "",
        scripts: scripts,
    }
}

export default program;
