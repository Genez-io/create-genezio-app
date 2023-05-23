<div align="center"> <a href="https://genez.io/">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/genez-io/graphics/raw/HEAD/svg/Logo_Genezio_White.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/genez-io/graphics/raw/HEAD/svg/Logo_Genezio_Black.svg">
  <img alt="genezio logo" src="https://github.com/genez-io/graphics/raw/HEAD/svg/Logo_Genezio_Black.svg">
</picture>

</div>

<br>

<div align="center">
<h1>create-genezio-app</h1><h3>The easiest way to start a serverless full-stack application</h3>
</div>

<br>

<div align="center">

[![build](https://github.com/genez-io/create-genezio-app/actions/workflows/build.yaml/badge.svg)](https://github.com/genez-io/create-genezio-app/actions/workflows/build.yaml)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat&color=62C353)](https://github.com/Genez-io/create-genezio-app/blob/master/CONTRIBUTING.md)
[![npm-version](https://img.shields.io/npm/v/@genezio/create-genezio-app.svg?style=flat&label=npm-package-version&color=62C353)](https://www.npmjs.com/package/@genezio/create-genezio-app)
<!-- [![npm-downloads](https://img.shields.io/npm/dm/create-genezio-app.svg?style=flat&label=npm-downloads&color=62C353)](https://www.npmjs.com/package/create-genezio-app)
-->

</div>

<div align="center">

[![Join our community](https://img.shields.io/discord/1024296197575422022?style=social&label=Join%20our%20community%20&logo=discord&labelColor=6A7EC2)](https://discord.gg/uc9H5YKjXv)
[![Follow @geneziodev](https://img.shields.io/twitter/url/https/twitter.com/geneziodev.svg?style=social&label=Follow%20%40geneziodev)](https://twitter.com/geneziodev)

</div>

# What is `create-genezio-app`

`create-genezio-app` generates project templates that suit your needs, so you can focus on coding the application logic using your favorite programming language.

You are welcome to integrate your own libraries to solve the needs of your application.

# Contents
  - [Features](#features)
  - [Getting started](#getting-started)
  - [Documentation](#documentation)
  - [Getting support](#getting-support)
  - [System requirements](#system-requirements)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [Ecosystem](#ecosystem)
  - [Badge](#badge)
  - [License](#license)

# Features

- 👩‍💻&nbsp; Generate a starting project for your backend code in Javascript, Typescript or Dart.
- 🖼️&nbsp; Generate a starting project for your backend code in React or Flutter.
- 🔨&nbsp; Integration with `git` to version your code.

# Getting started

## Generate your template

To start an application using `create-genezio-app` run the following command and answer the command prompt questions:

```bash
npx @genezio/create-genezio-app
```

## Deploy with genezio

To see magic happening, you can also deploy your application on a serverless infrastructure using `genezio`.

Install `genezio` on you machine:
```bash
npm install -g genezio
```

Login into our infrastructure with:
```bash
genezio login
```

Head to the `server` directory of your project and run:
```bash
cd /<project-directory>/server && genezio deploy
```

# Documentation

To find more details on how to use `genezio`, check out the official [documentation](https://genez.io/docs):

- [Getting started](https://docs.genez.io/genezio-documentation/getting-started)
- [Project Structure](https://docs.genez.io/genezio-documentation/project-structure)
- [CLI commands](https://docs.genez.io/genezio-documentation/cli-tool)
- [Test Interface](https://docs.genez.io/genezio-documentation/test-interface)
- [Integrations](https://docs.genez.io/genezio-documentation/integrations)

If you cannot find what you are looking for in the docs, don't hesitate to drop us a [GitHub issue](https://github.com/Genez-io/genezio/issues) or [start a discussion on Discord](https://discord.gg/uc9H5YKjXv).

# Getting support

We want you to get your project up and running in no-time.

If you find yourself in a pickle using `genezio` or `create-genezio-app`, drop us a [GitHub issue](https://github.com/Genez-io/create-genezio-app/issues), [start a discussion with us on Discord](https://discord.gg/uc9H5YKjXv) or drop us an email at [contact@genezio.io](contact@genezio.io).

# System requirements

- `genezio` can be installed and used on macOS, Linux-based distributions and Windows.
- A version of `node` >= 14.0.0 should be installed on your machine.

# Troubleshooting

For the most common issues that our users have dealt with, we created a [Troubleshooting](https://docs.genez.io/genezio-documentation/troubleshooting) section in the documentation.

If you don't find the guidance there, drop us a [GitHub issue](https://github.com/Genez-io/create-genezio-app/issues). We are more than happy to help you!

# Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

Show your support by giving us a star :star:, to help others discover `genezio` and become part of our community!

# Ecosystem

There are a growing number of awesome projects deployed with `genezio` and we want to shout out about them.

If you deployed a project using `genezio` let us know on [Discord](https://discord.gg/uc9H5YKjXv) and we will add it to our [Hall Of Fame](https://github.com/Genez-io/genezio#hall-of-fame).

# Badge

Brag to your friends that you are using `genezio` with this awesome badge -> [![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)

```md
[![deployed with: genezio](https://img.shields.io/badge/deployed_with-genezio-6742c1.svg?labelColor=62C353&style=flat)](https://github.com/genez-io/genezio)
```

# License

`create-genezio-app` is licensed under `GNU General Public License v3.0`. For more information, please refer to [LICENSE](LICENSE).
