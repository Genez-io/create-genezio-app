import { execa } from 'execa';
import log from "loglevel";
import path from "path";
import chalk from "chalk";
import { CreateProjectOptions } from "../types/CreateProjectOptions.js";


export async function installDependencies(projectOptions: CreateProjectOptions) {
    log.info("Installing dependencies...");

    switch (projectOptions.packageManager) {
        case "npm":
            const subprocess = await execa("npm", ["install"], {
                cwd: path.join(process.cwd(), projectOptions.projectName, "server"),
                stderr: "inherit",
            });
            await execa("npm", ["install", "--legacy-peer-deps"], {
                cwd: path.join(process.cwd(), projectOptions.projectName, "client"),
                stderr: "inherit",
            });
            break;
        case "yarn":
            console.log("not implemented yet");
            break;
        case "pnpm":
            console.log("not implemented yet");
            break;
        default:
            await execa("npm", ["install"], {
                cwd: path.join(process.cwd(), projectOptions.projectName, "server"),
                stderr: "inherit",
            });
            await execa("npm", ["install", "--legacy-peer-deps"], {
                cwd: path.join(process.cwd(), projectOptions.projectName, "client"),
                stderr: "inherit",
            });
            break;
    }

    chalk.green("Successfully installed dependencies!\n");
}
