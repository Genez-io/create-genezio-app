import inquirer from 'inquirer';
import { validateAppName } from '../utils/validateAppName.js';
import { DEFAULT_APP_NAME, FRONTEND_FRAMEWORKS, LANGUAGES_LONG, Q_APP_NAME, Q_BACKEND_PROGRAMMING_LANGUAGE, Q_FRONTEND_FRAMEWORK, Q_FRONTEND_PROGRAMMING_LANGUAGE, Q_GIT, Q_OVERWRITE_DIRECTORY } from '../consts.js';

export async function promptAppName() {
    const answers = await inquirer.prompt([
        {
            name: "appName",
            type: "input",
            message: Q_APP_NAME,
            default: DEFAULT_APP_NAME,
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

    return answers.backendLanguage;
}

export async function promptFrontendLanguage() {
    const answers = await inquirer.prompt([
        {
            name: "frontendLanguage",
            type: "list",
            message: Q_FRONTEND_PROGRAMMING_LANGUAGE,
            choices: LANGUAGES_LONG,
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

    return answers.frontendLanguage;
}

export async function promptFrontendFramework() {
    const answers = await inquirer.prompt([
        {
            name: "frontendFramework",
            type: "list",
            message: Q_FRONTEND_FRAMEWORK,
            choices: FRONTEND_FRAMEWORKS,
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

    return answers.frontendFramework;
}

export async function promptInitGit() {
    const answers = await inquirer.prompt([
        {
            name: "git",
            type: "confirm",
            message: Q_GIT,
            default: true,
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
