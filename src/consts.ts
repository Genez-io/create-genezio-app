import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ClassType, CloudProvider, CreateProjectOptions, ProjectConfigurationOptions, Region, SDKRuntime } from './types/ProjectOptions.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const PKG_DIRECTORY = __dirname

// Wizard questions
export const Q_APP_NAME = 'What is the name of your project?';
export const Q_BACKEND_PROGRAMMING_LANGUAGE = 'What programming language do you want to use for your backend? ';
export const Q_FRONTEND_PROGRAMMING_LANGUAGE = 'What programming language do you want to use for your frontend?';
export const Q_FRONTEND_FRAMEWORK = 'What frontend framework would you like to use?';
export const Q_PACKAGE_MANAGER = 'Which package manager do you prefer to use?';
export const Q_AUTHENTICATION = 'Do you want to use authentication?';
export const Q_DATABASE = 'Which database do you prefer to use?';
export const Q_GIT = 'Would you like us to initialize a git repository for your project?';
export const Q_INSTALL_DEPENDENCIES = 'Would you like us to install the dependencies for you?';
export const Q_OVERWRITE_DIRECTORY = 'Uh oh, it seems like the project directory already exists. Would you like to overwrite it?';

// Supported programming languages
export const LANGUAGES_SHORT: string[] = ["js", "ts", "swift", "python", "dart"];
export const LANGUAGES_LONG: string[] = ["JavaScript", "TypeScript", "Swift", "Python", "Dart"];
export const FRONTEND_FRAMEWORKS: string[] = ["React", "Vue", "Angular", "None"];

// Default values
export const CREATE_GENEZIO_APP = 'create-genezio-app';
export const DEFAULT_APP_NAME = 'my-genezio-app';

// Default project
export const DEFAULT_PROJECT_CONFIGURATION: ProjectConfigurationOptions = {
    cloudProvider: CloudProvider.AWS,
    region: Region.US_EAST_1,
    sdkLanguage: "typescript",
    sdkRuntime: SDKRuntime.BROWSER,
    sdkPath: path.join(".", "client", "src", "sdk"),
    frontendPath: path.join(".", "client", "src", "build"),
    frontendSubdomain: "",
    indexClassPath: path.join(".", "server", "src", "index.ts"),
    indexClassType: ClassType.JSONRPC,
    scripts: {
        preBackend: "",
        postBackend: "",
        preFrontend: "cd client && npm install && npm run build",
        postFrontend: "",
    },
}

export const DEFAULT_PROJECT_OPTIONS: CreateProjectOptions = {
    projectName: DEFAULT_APP_NAME,
    backendLanguage: "typescript",
    frontendLanguage: "typescript",
    frontendFramework: "react",
    packageManager: "npm",
    authentication: "none",
    database: "none",
    initGit: true,
    installDependencies: true,
    projectConfiguration: DEFAULT_PROJECT_CONFIGURATION,
}
