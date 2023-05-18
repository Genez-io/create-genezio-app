export type ProjectConfigurationOptions = {
    cloudProvider: CloudProvider;
    region: Region;
    projectName: string;
    backendOptions?: BackendOptions;
    frontendOptions?: FrontendOptions;
    authentication: string;
    database: string;
    initGit: boolean;
    installDependencies: boolean;
}

export type BackendOptions = {
    language: string;
    packageManager: string;
    scripts: ScriptsOptions;
    classes: Class[];
}

export type FrontendOptions = {
    language: string;
    framework: string;
    packageManager: string;
    sdkPath: string;
    sdkLanguage: string;
    sdkRuntime: SDKRuntime;
    frontendPath: string;
    frontendSubdomain: string
    scripts: ScriptsOptions;
}

export type ScriptsOptions = {
    preBackend?: string;
    postBackend?: string;
    preFrontend?: string;
    postFrontend?: string;
}

export type Class = {
    path: string;
    name?: string;
    type?: ClassType;
}

export type ProjectConfigurationView = {
    app_name: string;
    cloud_provider: string;
    region: string;
    sdk_language: string;
    sdk_runtime: string;
    sdk_path: string;
    frontend_path: string;
    frontend_subdomain: string;
    prebackend?: {
        scripts_prebackend?: string;
    };
    postbackend?:  {
        scripts_postbackend?: string;
    };
    prefrontend?: {
        scripts_prefrontend?: string;
    };
    postfrontend?:  {
        scripts_postfrontend?: string;
    };
    classes: ClassView[];
}

export type ClassView = {
    path: string;
    name?: {
        value?: string;
    };
    type?: ClassType;
}

export enum CloudProvider {
    AWS = "aws",
    GENEZIO = "genezio",
}

export enum Region {
    US_EAST_1 = "us-east-1",
    US_EAST_2 = "us-east-2",
    US_WEST_1 = "us-west-1",
    US_WEST_2 = "us-west-2",
    EU_WEST_1 = "eu-west-1",
    EU_WEST_2 = "eu-west-2",
    EU_WEST_3 = "eu-west-3",
    EU_CENTRAL_1 = "eu-central-1",
    AP_SOUTH_1 = "ap-south-1",
    AP_SOUTHEAST_1 = "ap-southeast-1",
    AP_SOUTHEAST_2 = "ap-southeast-2",
    AP_NORTHEAST_1 = "ap-northeast-1",
    AP_NORTHEAST_2 = "ap-northeast-2",
    SA_EAST_1 = "sa-east-1",
    CA_CENTRAL_1 = "ca-central-1",
}

export enum SDKRuntime {
    NODEJS = "nodejs",
    BROWSER = "browser",
}

export enum ClassType {
    JSONRPC = "jsonrpc",
    HTML = "http",
    CRON = "cron",
}
