import Mustache from "mustache";
import path from "path";
import ora from "ora";
import fs from "fs-extra";
import chalk from "chalk";
import { genezioYamlMustacheTemplate } from "../templates/genezioYamlMustacheTemplate.js";
import { generateRandomSubdomain } from "../utils/generateRandomSubdomain.js";
import { PKG_DIRECTORY } from "../consts.js";
import { promptOverwriteProject } from "../cli/prompts.js";
import { Class, CreateProjectOptions, ProjectConfigurationView } from "../types/ProjectOptions.js";
import { translateFromLongLanguagesToExtensions } from "../utils/translateFromLongLanguagesToExtensions.js";

export async function createProjectFromTemplate(projectOptions: CreateProjectOptions) {
    const projectDirectory = path.join(process.cwd(), projectOptions.projectName);

    // Create project directory - overwrite logic
    await createProjectDirectory(projectDirectory).catch((error) => {
        throw error;
    });

    const spinner = ora(`Creating project directory at ${projectDirectory}...\n`).start();

    // Copy template
    spinner.info(`Copying boilerplate files...`);
    fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", ".genezioignore"), path.join(projectDirectory, ".genezioignore"));
    fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", ".gitignore"), path.join(projectDirectory, ".gitignore"));
    fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", "README.md"), path.join(projectDirectory, "README.md"));
    // This is a temporary workaround
    // If we are not providing a tsconfig.json file near the configuration file,
    // genezio will create a default one, which is not desirable because it does not excludes the client sources
    if (projectOptions.frontendLanguage === "typescript") {
        fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", "tsconfig.json"), path.join(projectDirectory, "tsconfig.json"));
    }
    spinner.succeed(`Boilerplate files ${chalk.green("copied successfully!")}\n`);

    // Copy server template
    spinner.info(`Copying server template files...`);
    switch (projectOptions.backendLanguage) {
        case "typescript":
            fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "servers", "typescript"), path.join(projectDirectory, "server"));
            break;
        case "javascript":
            fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "servers", "javascript"), path.join(projectDirectory, "server"));
            break;
        case "dart":
            console.log("not implemented yet");
            break;
        default:
            throw new Error("Invalid backend language");
    }
    spinner.succeed(`Server template files ${chalk.green("copied successfully!")}\n`);

    // Copy client template
    spinner.info(`Copying client template files...`);
    switch (projectOptions.frontendFramework) {
        case "react":
            if (projectOptions.frontendLanguage === "typescript") {
                fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "clients", "react-ts"), path.join(projectDirectory, "client"));
            } else if (projectOptions.frontendLanguage === "javascript") {
                fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "clients", "react-js"), path.join(projectDirectory, "client"));
            }
            break;
        case "angular":
            console.log("not implemented yet");
            break;
        case "vue":
            console.log("not implemented yet");
            break;
        case "swift":
            console.log("not implemented yet");
            break;
        case "flutter":
            console.log("not implemented yet");
            break;
        case "python":
            console.log("not implemented yet");
            break;
        default:
            throw new Error("Invalid frontend framework");
    }
    spinner.succeed(`Client template files ${chalk.green("copied successfully!")}\n`);

    // Create genezio.yaml with mustache template
    spinner.info(`Creating genezio.yaml...`);
    await createGenezioConfigFile(projectOptions).catch((error) => {
        throw error;
    });
    spinner.succeed(`genezio.yaml ${chalk.green("created successfully!")}\n`);
}

async function createProjectDirectory(projectDirectory: string) {
    const spinner = ora(`Creating project directory ${projectDirectory}...\n`).start();

    if (fs.existsSync(projectDirectory)) {
        if (fs.readdirSync(projectDirectory).length === 0) {
            spinner.info(`Creating project skeleton in: ${projectDirectory}...`);
        } else {
            spinner.stopAndPersist();
            const overwriteProject = await promptOverwriteProject();
            if (overwriteProject) {
                spinner.fail(`Project creation aborted.`);
                process.exit(1);
            }
        }
    } else {
        fs.mkdirSync(projectDirectory);
    }
    spinner.succeed(
    `${projectDirectory} ${chalk.green("created successfully!")}\n`,
    );
}

async function createGenezioConfigFile(projectOptions: CreateProjectOptions) {
    // const backendLanguageExtension = await translateFromLongLanguagesToExtensions(projectOptions.backendLanguage);
    const frontendLanguageExtension = await translateFromLongLanguagesToExtensions(projectOptions.frontendLanguage);
    const view: ProjectConfigurationView = {
        app_name: projectOptions.projectName,
        cloud_provider: projectOptions.projectConfiguration.cloudProvider,
        region: projectOptions.projectConfiguration.region,
        sdk_language: frontendLanguageExtension,
        sdk_runtime: projectOptions.projectConfiguration.sdkRuntime,
        sdk_path: projectOptions.projectConfiguration.sdkPath,
        frontend_path: projectOptions.projectConfiguration.frontendPath,
        frontend_subdomain: generateRandomSubdomain(),
        prebackend: {
            scripts_prebackend: projectOptions.projectConfiguration.scripts.preBackend,
        },
        postbackend: {
            scripts_postbackend: projectOptions.projectConfiguration.scripts.postBackend
        },
        prefrontend: {
            scripts_prefrontend: projectOptions.projectConfiguration.scripts.preFrontend
        },
        postfrontend: {
            scripts_postfrontend: projectOptions.projectConfiguration.scripts.postFrontend
        },
        classes: [],
    }

    for (const element of projectOptions.projectConfiguration.classes) {
        const classView: Class = {
            path: element.path,
            type: element.type,
        }
        view.classes.push(classView);
    }
    const configFileRendered = Mustache.render(genezioYamlMustacheTemplate, view);
    fs.writeFileSync(path.join(projectOptions.projectName, "genezio.yaml"), configFileRendered);
}
