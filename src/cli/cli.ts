import { Command, CommanderError } from "commander";
import { exit } from "process";
import { CREATE_GENEZIO_APP } from "../consts";
import { promptAppName, promptBackendLanguage, promptFrontendLanguage, promptInitGit } from "./prompts";
import { createProject } from "../helpers/createProject";
import { initGitRepository } from "../helpers/initGitRepository";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pjson = require("../../package.json");

const program = new Command().name(CREATE_GENEZIO_APP);

program
  .description("A CLI tool to create full-stack applications with genezio infrastructure!")
  .exitOverride((err: CommanderError) => {
    if (err.code === "commander.help" || err.code === "commander.version" || err.code === "commander.helpDisplayed") {
      exit(0);
    } else {
      console.log(`Type '${CREATE_GENEZIO_APP} --help'.`);
    }
  })
  .addHelpText("afterAll", " If you have any problems, do not hesitate to file an issue at: https://github.com/genez-io/create-genezio-app/issues/new")
  .argument("[project-directory]", "The name of the application as well as the name of the directory it will be created in.")
  .version(pjson.version)
  .option("--default", "use default values for all questions")
  .option("-b, --backend-language <backend-language>", "set the programming language of your backend")
  .option("-f, --frontend-language <frontend-language>", "set the programming language of your frontend")
  .action(async (projectDirectory: string, options: { default: boolean; frontendLanguage: string; backendLanguage: string }) => {
    if (options.default) {
       console.log("Use default values for all questions.");
    } else {
        // Retrieve user preferences
       if (!projectDirectory) {
            const appName = await promptAppName()
            .catch((error) => {
                console.log(error);
            });
            console.log(`Creating your project in ${appName}.`);
        }

        const backendLanguage = await promptBackendLanguage().catch((error) => {
            console.log(error);
        });
        console.log(`Using ${backendLanguage} as backend language.`);

        const frontendLanguage = await promptFrontendLanguage().catch((error) => {
            console.log(error);
        });
        console.log(`Using ${frontendLanguage} as frontend language.`);

        const initGit = await promptInitGit().catch((error) => {
            console.log(error);
        });
        if (initGit) {
            console.log("Initializing git repository.");
        } else {
            console.log("Not initializing git repository. You can do this later by running `git init` in your project directory.");
        }

        // Create project
        await createProject().catch((error) => {
            console.log(error);
        });

        // Init git repository
        if (initGit) {
            await initGitRepository().catch((error) => {
                console.log(error);
            });
        }
    }
  });

export default program;
