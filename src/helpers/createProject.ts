import Mustache from "mustache";
import path from "path";
import ora from "ora";
import fs from "fs-extra";
import chalk from "chalk";
import { genezioYamlMustacheTemplate } from "../templates/genezioYamlMustacheTemplate.js";
import { generateRandomSubdomain } from "../utils/generateRandomSubdomain.js";
import { PKG_DIRECTORY } from "../consts.js";
import { promptOverwriteProject } from "../cli/prompts.js";
import { CreateProjectOptions } from "../types/CreateProjectOptions.js";
import { translateFromLongLanguagesToExtensions } from "../utils/translateFromLongLanguagesToExtensions.js";

interface GenezioYamlTemplate {
    app_name: string;
    cloud_provider: string;
    region: string;
    sdk_language: string;
    sdk_runtime: string;
    sdk_path: string;
    frontend_path: string;
    frontend_subdomain: string;
    scripts_prebackend: string;
    scripts_postbackend: string;
    scripts_prefrontend: string;
    scripts_postfrontend: string;
    index_class_path:string;
    index_class_type:string;
}

export async function createProject(projectOptions: CreateProjectOptions) {
    const projectDirectory = path.join(process.cwd(), projectOptions.projectName);

    const spinner = ora(`Creating project skeleton in: ${projectDirectory}...\n`).start();

    // Create project directory
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
    `${projectOptions.projectName} ${chalk.green("created successfully!")}\n`,
    );

    // Copy template
    spinner.info(`Copying template files...`);
    fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", ".genezioignore"), path.join(projectDirectory, ".genezioignore"));
    fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", ".gitignore"), path.join(projectDirectory, ".gitignore"));
    fs.copyFile(path.join(PKG_DIRECTORY, "templates", "basic", "README.md"), path.join(projectDirectory, "README.md"));
    spinner.succeed(`Template files ${chalk.green("copied successfully!")}\n`);

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

    const backendLanguageExtension = await translateFromLongLanguagesToExtensions(projectOptions.backendLanguage);
    const frontendLanguageExtension = await translateFromLongLanguagesToExtensions(projectOptions.frontendLanguage);
    const view: GenezioYamlTemplate = {
        app_name: projectOptions.projectName,
        cloud_provider: "aws",
        region: "eu-central-1",
        sdk_language: frontendLanguageExtension,
        sdk_runtime: "browser",
        sdk_path: path.join(".", "client", "src", "sdk"),
        frontend_path: path.join(".", "client", "build"),
        frontend_subdomain: generateRandomSubdomain(),
        scripts_prebackend: "",
        scripts_postbackend: "",
        scripts_prefrontend: "cd client && npm install && npm run build",
        scripts_postfrontend: "",
        index_class_path: path.join(".", "server", "task" + "." + backendLanguageExtension),
        index_class_type: "jsonrpc",
    }
    const genezioYamlRendered = Mustache.render(genezioYamlMustacheTemplate, view);
    fs.writeFileSync(path.join(projectDirectory, "genezio.yaml"), genezioYamlRendered);
    spinner.succeed(`genezio.yaml ${chalk.green("created successfully!")}\n`);
}
