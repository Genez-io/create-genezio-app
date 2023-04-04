import inquirer from 'inquirer';
import { validateAppName } from '../utils/validateAppName';
import { DEFAULT_APP_NAME, LANGUAGES_LONG, Q_APP_NAME, Q_BACKEND_PROGRAMMING_LANGUAGE, Q_GIT } from '../consts';

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

    return answers.frontendLanguage;
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
