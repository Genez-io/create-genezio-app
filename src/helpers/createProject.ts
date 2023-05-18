import Mustache from "mustache";
import path from "path";
import ora from "ora";
import fs from "fs-extra";
import chalk from "chalk";
import { genezioYamlMustacheTemplate } from "../templates/genezioYamlMustacheTemplate.js";
import { generateRandomSubdomain } from "../utils/generateRandomSubdomain.js";
import { PKG_DIRECTORY } from "../consts.js";
import { promptOverwriteProject } from "../cli/prompts.js";
import { ClassView, ProjectConfigurationOptions, ProjectConfigurationView } from "../types/ProjectOptions.js";
import { translateFromLongLanguagesToExtensions } from "../utils/translateFromLongLanguagesToExtensions.js";

export async function createProjectFromTemplate(projectOptions: ProjectConfigurationOptions) {
    const projectDirectory = path.join(process.cwd(), projectOptions.projectName);

    // Create project directory. If the directory exists,
    // it will ask the user if he wants to overwrite it
    await createProjectDirectory(projectDirectory).catch((error) => {
        throw error;
    });

    const spinner = ora(`Creating project directory at ${projectDirectory}...\n`).start();

    // Copy files from templates
    spinner.info(`Copying boilerplate files...`);
    fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", ".genezioignore"), path.join(projectDirectory, ".genezioignore"));
    fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", ".gitignore"), path.join(projectDirectory, ".gitignore"));
    fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", "README.md"), path.join(projectDirectory, "README.md"));
    spinner.succeed(`Boilerplate files ${chalk.green("copied successfully!")}\n`);

    // Copy server template files
    spinner.info(`Copying server template files...`);
    switch (projectOptions.backendOptions?.language) {
        case "typescript":
            fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "servers", "typescript"), path.join(projectDirectory, "server"));
            break;
        case "javascript":
            fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "servers", "javascript"), path.join(projectDirectory, "server"));
            break;
        case "dart":
            fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "servers", "dart"), path.join(projectDirectory, "server"));
            break;
        default:
            throw new Error("Invalid backend language");
    }
    spinner.succeed(`Server template files ${chalk.green("copied successfully!")}\n`);

    // Copy client template files
    spinner.info(`Copying client template files...`);
    switch (projectOptions.frontendOptions?.framework) {
        case "react":
            if (projectOptions.frontendOptions?.language === "typescript") {
                fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "clients", "react-ts"), path.join(projectDirectory, "client"));
            } else if (projectOptions.frontendOptions?.language === "javascript") {
                fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "clients", "react-js"), path.join(projectDirectory, "client"));
            }
            break;
        case "flutter":
            fs.copySync(path.join(PKG_DIRECTORY, "templates", "basic", "clients", "flutter"), path.join(projectDirectory, "client"));
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

async function createGenezioConfigFile(projectOptions: ProjectConfigurationOptions) {
    const frontendLanguageExtension = await translateFromLongLanguagesToExtensions(projectOptions.frontendOptions?.language || "");
    const view: ProjectConfigurationView = {
        app_name: projectOptions.projectName,
        cloud_provider: projectOptions.cloudProvider,
        region: projectOptions.region,
        sdk_language: frontendLanguageExtension,
        sdk_runtime: projectOptions.frontendOptions?.sdkRuntime || "",
        sdk_path: projectOptions.frontendOptions?.sdkPath || "",
        frontend_path: projectOptions.frontendOptions?.frontendPath || "",
        frontend_subdomain: generateRandomSubdomain(),
        prebackend: {
            scripts_prebackend: projectOptions.backendOptions?.scripts.preBackend,
        },
        prefrontend: {
            scripts_prefrontend: projectOptions.frontendOptions?.scripts.preFrontend
        },
        classes: [],
    }

    if (projectOptions.backendOptions !== undefined) {
        for (const c of projectOptions.backendOptions.classes) {
            const classView: ClassView = {
                path: c.path,
                type: c.type,
            }
            if (c.name !== "") {
                classView.name = {value: c.name};
            }
            view.classes.push(classView);
        }
    }
    const configFileRendered = Mustache.render(genezioYamlMustacheTemplate, view);
    fs.writeFileSync(path.join(projectOptions.projectName, "server", "genezio.yaml"), configFileRendered);
}
