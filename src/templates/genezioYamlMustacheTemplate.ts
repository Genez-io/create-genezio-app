export const genezioYamlMustacheTemplate = `name: {{app_name}}
cloud-provider: {{cloud_provider}}
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
  preFrontendDeploy: {{{scripts_prefrontend}}}
classes:
  - path: {{{index_class_path}}}
    type: {{index_class_type}}
    methods: []
`
