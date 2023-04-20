import inquirer from 'inquirer';
import { validateAppName } from '../utils/validateAppName.js';
import { DEFAULT_PROJECT_OPTIONS, FRONTEND_FRAMEWORKS, LANGUAGES_LONG, Q_APP_NAME, Q_AUTHENTICATION, Q_BACKEND_PROGRAMMING_LANGUAGE, Q_FRONTEND_FRAMEWORK, Q_FRONTEND_PROGRAMMING_LANGUAGE, Q_GIT, Q_INSTALL_DEPENDENCIES, Q_OVERWRITE_DIRECTORY, Q_PACKAGE_MANAGER } from '../consts.js';

export async function promptAppName() {
    const answers = await inquirer.prompt([
        {
            name: "appName",
            type: "input",
            message: Q_APP_NAME,
            default: DEFAULT_PROJECT_OPTIONS.projectName,
            validate: (input: string) => {
                return validateAppName(input);
            },
            transformer: (input: string) => {
                return input.trim();
            },
        }
    ]).then((answers) => {
        return answers;
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            throw new Error("Prompt couldn't be rendered in the current environment")
        } else {
            throw new Error(error)
        }
    });

    return answers.appName;
}

export async function promptBackendLanguage() {
    const answers = await inquirer.prompt([
        {
            name: "backendLanguage",
            type: "list",
            message: Q_BACKEND_PROGRAMMING_LANGUAGE,
            choices: LANGUAGES_LONG,
            default: DEFAULT_PROJECT_OPTIONS.backendLanguage,
        }
    ])
    .then((answers) => {
        return answers;
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            throw new Error("Prompt couldn't be rendered in the current environment")
        } else {
            throw new Error(error)
        }
    });

    return answers.backendLanguage.toLowerCase();
}

export async function promptFrontendLanguage() {
    const answers = await inquirer.prompt([
        {
            name: "frontendLanguage",
            type: "list",
            message: Q_FRONTEND_PROGRAMMING_LANGUAGE,
            choices: LANGUAGES_LONG,
            default: DEFAULT_PROJECT_OPTIONS.frontendLanguage,
        }
    ])
    .then((answers) => {
        return answers;
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            throw new Error("Prompt couldn't be rendered in the current environment")
        } else {
            throw new Error(error)
        }
    });

    return answers.frontendLanguage.toLowerCase();
}

export async function promptFrontendFramework() {
    const answers = await inquirer.prompt([
        {
            name: "frontendFramework",
            type: "list",
            message: Q_FRONTEND_FRAMEWORK,
            choices: FRONTEND_FRAMEWORKS,
            default: DEFAULT_PROJECT_OPTIONS.frontendFramework,
        }
    ])
    .then((answers) => {
        return answers;
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            throw new Error("Prompt couldn't be rendered in the current environment")
        } else {
            throw new Error(error)
        }
    });

    return answers.frontendFramework.toLowerCase();
}

export async function promptPackageManager() {
    const answers = await inquirer.prompt([
        {
            name: "packageManager",
            type: "list",
            message: Q_PACKAGE_MANAGER,
            choices: ["npm", "yarn"],
            default: DEFAULT_PROJECT_OPTIONS.packageManager,
        }
    ])
    .then((answers) => {
        return answers;
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            throw new Error("Prompt couldn't be rendered in the current environment")
        } else {
            throw new Error(error)
        }
    });

    return answers.packageManager;
}

export async function promptAuthentication() {
    const answers = await inquirer.prompt([
        {
            name: "authentication",
            type: "confirm",
            message: Q_AUTHENTICATION,
            default: DEFAULT_PROJECT_OPTIONS.authentication,
        }
    ])
    .then((answers) => {
        return answers;
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            throw new Error("Prompt couldn't be rendered in the current environment")
        } else {
            throw new Error(error)
        }
    });

    return answers.authentication;
}

export async function promptInitGit() {
    const answers = await inquirer.prompt([
        {
            name: "git",
            type: "confirm",
            message: Q_GIT,
            default: DEFAULT_PROJECT_OPTIONS.initGit,
        }
    ])
    .then((answers) => {
        return answers;
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            throw new Error("Prompt couldn't be rendered in the current environment")
        } else {
            throw new Error(error)
        }
    });

    return answers.git;
}

export async function promptInstallDependencies() {
    const answers = await inquirer.prompt([
        {
            name: "installDependencies",
            type: "confirm",
            message: Q_INSTALL_DEPENDENCIES,
            default: DEFAULT_PROJECT_OPTIONS.installDependencies,
        }
    ])
    .then((answers) => {
        return answers;
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            throw new Error("Prompt couldn't be rendered in the current environment")
        } else {
            throw new Error(error)
        }
    });

    return answers.installDependencies;
}

export async function promptOverwriteProject() {
    const answers = await inquirer.prompt([
        {
            name: "overwriteDirectory",
            type: "confirm",
            message: Q_OVERWRITE_DIRECTORY,
            default: false,
        }
    ])
    .then((answers) => {
        return answers;
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            throw new Error("Prompt couldn't be rendered in the current environment")
        } else {
            throw new Error(error)
        }
    });

    return answers.overwrite;
}
