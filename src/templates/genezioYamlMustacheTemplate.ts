export const genezioYamlMustacheTemplate = `name: {{app_name}}
cloudProvider: {{cloud_provider}}
region: {{region}}
sdk:
  language: {{sdk_language}}
  options:
    runtime: {{sdk_runtime}}
  path: {{{sdk_path}}}
frontend:
  path: {{{frontend_path}}}
  subdomain: {{frontend_subdomain}}
scripts:
  preBackendDeploy: {{#prebackend}} {{{scripts_prebackend}}} {{/prebackend}}
  postBackendDeploy: {{#postbackend}} {{{scripts_postbackend}}} {{/postbackend}}
  preFrontendDeploy: {{#prefrontend}} {{{scripts_prefrontend}}} {{/prefrontend}}
  postFrontendDeploy: {{#postfrontend}} {{{scripts_postfrontend}}} {{/postfrontend}}
classes:
  {{#classes}}
  - path: {{{path}}}
    type: {{{type}}}
    methods: []
  {{/classes}}
`;
