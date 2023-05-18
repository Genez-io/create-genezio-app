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
  {{#prebackend}}
  preBackendDeploy: {{{scripts_prebackend}}}
  {{/prebackend}}
  {{#postbackend}}
  postBackendDeploy: {{{scripts_postbackend}}}
  {{/postbackend}}
  {{#prefrontend}}
  preFrontendDeploy: {{{scripts_prefrontend}}}
  {{/prefrontend}}
  {{#postfrontend}}
  postFrontendDeploy: {{{scripts_postfrontend}}}
  {{/postfrontend}}
classes:
  {{#classes}}
  - path: {{{path}}}
    {{#name}}
    name: {{{value}}}
    {{/name}}
    type: {{{type}}}
    methods: []
  {{/classes}}
`;
