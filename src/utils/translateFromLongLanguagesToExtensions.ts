export async function translateFromLongLanguagesToExtensions(language:string) {
    switch (language) {
        case "typescript":
            return "ts";
        case "javascript":
            return "js";
        case "dart":
            return "dart";
        case "python":
            return "py";
        case "swift":
            return "swift";
        default:
            throw new Error("Invalid language");
    }

}
