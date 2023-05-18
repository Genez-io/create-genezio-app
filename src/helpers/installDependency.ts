import { execa } from 'execa';
import log from "loglevel";
import path from "path";
import chalk from "chalk";
import { ProjectConfigurationOptions } from "../types/ProjectOptions.js";

export async function installDependencies(projectOptions: ProjectConfigurationOptions) {
    log.info("Installing dependencies...");

    // Check if backend options are undefined
    if (projectOptions.backendOptions === undefined) {
        log.info("There is no backend instantiated. Skipping backend dependencies installation.");
    } else {
        switch (projectOptions.backendOptions?.packageManager) {
            case "npm":
                await execa("npm", ["install"], {
                    cwd: path.join(process.cwd(), projectOptions.projectName, "server"),
                    stderr: "inherit",
                });
                break;
            case "dart":
                await execa("dart", ["pub", "get"], {
                    cwd: path.join(process.cwd(), projectOptions.projectName, "server"),
                    stderr: "inherit",
                });
                break;
            default:
                throw new Error("Unknown package manager");
        }
    }

    // Check if frontend options are undefined
    if (projectOptions.frontendOptions === undefined) {
        log.info("There is no backend instantiated. Skipping backend dependencies installation.");
    } else {
        switch (projectOptions.frontendOptions?.packageManager) {
            case "npm":
                await execa("npm", ["install"], {
                    cwd: path.join(process.cwd(), projectOptions.projectName, "client"),
                    stderr: "inherit",
                });
                break;
            case "flutter":
                await execa("flutter", ["pub", "get"], {
                    cwd: path.join(process.cwd(), projectOptions.projectName, "client"),
                    stderr: "inherit",
                });
                break;
            default:
                throw new Error("Unknown package manager");
        }
    }

    chalk.green("Successfully installed dependencies!\n");
}
