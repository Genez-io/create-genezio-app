
import log from "loglevel";
import path from "path";

// Regex to check for lowercase letters, numbers, dashes and underlines
const validRegexExp = /^[a-z0-9-_]+$/;

export async function validateAppName(input: string) {
    const paths = input.split(path.sep);

    let appName = paths[paths.length - 1];

    // Check if appName contains only lowercase letters, numbers, dashes and underlines
    if (!validRegexExp.test(appName) && input !== ".") {
        log.error("Please enter a valid app name. It can only contain lowercase letters, numbers, dashes and underlines.");
        return false;
    }
    return true;
}
