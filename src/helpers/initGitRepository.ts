import ora from "ora";
import { simpleGit } from "simple-git";
import log from "loglevel";
import path from "path";

import { CreateProjectOptions } from "../types/ProjectOptions.js";

export async function initGitRepository(projectOptions: CreateProjectOptions) {
    log.info("Initializing git repository.");

    if (!isGitInstalled()) {
        log.error("Git is not installed. Skipping git initialization.");
        return;
    }

    const spinner = ora("Creating a new git repo...\n").start();
    spinner.start("Creating a new git repo...\n");

    const gitDefaultBranch = await getGitDefaultBranch()

    const gitVersion = await getGitVersion();

    if (gitVersion.major < 2 && gitVersion.minor < 28) {
        await simpleGit().cwd(path.join(process.cwd(),projectOptions.projectName)).init();
        await simpleGit().cwd(path.join(process.cwd(),projectOptions.projectName)).raw(["branch", "-m", `${gitDefaultBranch}`]);
    } else {
        await simpleGit().cwd(path.join(process.cwd(),projectOptions.projectName)).raw(["init", `--initial-branch=${gitDefaultBranch}`]);
    }
    await simpleGit().cwd(path.join(process.cwd(),projectOptions.projectName)).raw(["add", "."]);

    spinner.succeed("git repository created successfully!\n");
}

async function isGitInstalled() {
    const gitVersion = (await simpleGit().version()).installed;
    if (gitVersion) {
        return true;
    }
    return false;
}

async function getGitVersion() {
    const gitVersion = await simpleGit().version();
    return gitVersion;
}

async function getGitDefaultBranch() {
    const gitDefaultBranch = await simpleGit().getConfig("init.defaultBranch");
    return gitDefaultBranch.value;
}
