export type CreateProjectOptions = {
    projectName: string;
    backendLanguage: string;
    frontendLanguage: string;
    frontendFramework: string;
    packageManager: string;
    authentication: string;
    database: string;
    initGit: boolean;
    installDependencies: boolean;
    projectConfiguration: ProjectConfigurationOptions;
}

export type ProjectConfigurationOptions = {
    cloudProvider: CloudProvider;
    region: Region;
    sdkLanguage: string;
    sdkRuntime: SDKRuntime;
    sdkPath: string;
    frontendPath: string;
    frontendSubdomain: string
    classes: Class[];
    scripts: ScriptsOptions;
}

export type ScriptsOptions = {
    preBackend: string;
    postBackend: string;
    preFrontend: string;
    postFrontend: string;
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
        scripts_prebackend: string;
    };
    postbackend?:  {
        scripts_postbackend: string;
    };
    prefrontend?: {
        scripts_prefrontend: string;
    };
    postfrontend?:  {
        scripts_postfrontend: string;
    };
    classes: Class[];
}

export type Class = {
    path: string;
    type: ClassType;
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
