import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const PKG_DIRECTORY = __dirname

// Wizard questions
export const Q_APP_NAME = 'What is the name of your application?';
export const Q_BACKEND_PROGRAMMING_LANGUAGE = 'What is the programming language of your backend?';
export const Q_FRONTEND_PROGRAMMING_LANGUAGE = 'What is the programming language of your frontend?';
export const Q_FRONTEND_FRAMEWORK = 'What is the framework of your frontend?';
export const Q_DATABASE = 'What database do you want to use?';
export const Q_GIT = 'Do you want to initialize a git repository?';
export const Q_OVERWRITE_DIRECTORY = 'The project directory already exists. Do you want to overwrite it?';

// Supported programming languages
export const LANGUAGES_SHORT: string[] = ["js", "ts", "swift", "python", "dart"];
export const LANGUAGES_LONG: string[] = ["JavaScript", "TypeScript", "Swift", "Python", "Dart"];
export const FRONTEND_FRAMEWORKS: string[] = ["React", "Vue", "Angular", "None"];

// Default values
export const CREATE_GENEZIO_APP = 'create-genezio-app';
export const DEFAULT_APP_NAME = 'my-genezio-app';
