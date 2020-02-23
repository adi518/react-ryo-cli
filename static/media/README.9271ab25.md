![React Ryo CLI](https://raw.githubusercontent.com/adi518/react-ryo-cli/master/logo.png)

# What is React Ryo CLI? (WIP)

> Generate a one stop shop CLI for building and testing your React applications.

React Ryo CLI is a roll-your-own version of [CRA](https://github.com/facebook/create-react-app) ("create-react-app") `react-scripts` CLI, where you can reconfigure internal configurations, such as [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/), and [Jest](https://jestjs.io/). This package is based on [Craco](https://github.com/sharegate/craco). Using the aforementioned third-party, we are able to abstract away the intricacies of cross-industry build tools and their configurations, yet keep a "roll-your-own" approach to enable fine-grain changes. While [Vue.js](https://cli.vuejs.org/) already incorporated customizability in its CLI, CRA does not follow the same path, hence solutions like Craco have emerged, followed by this package.

## Usage

Execute the following command to create a boilerplate for your own CLI package.

```console
npx react-ryo-cli init
```

Or add to an existing package:

### Using NPM:

```console
npm install react-ryo-cli
```

### Using Yarn:

```console
yarn add react-ryo-cli
```

## Configuration

Create a `craco.config.js` file at the root of your package and `react-ryo-cli` will pick it up. See Craco docs for its [configuration API](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-overview). Your configuration will be merged with `react-ryo-cli` default configuration. However, you can choose to opt-out by calling `spawnApi` with `{ noExtend: true }` or by calling your CLI with the `--noExtend` argument.

## Who Is It For

This package is mainly targeted at infrastructure teams, UI architects/leads and anyone who maintains several React applications across their organization.

## Why

TL;DR: Create your own one stop shop CLI for building and testing your [React.js](https://reactjs.org/) applications.

Many software companies develop more than one front-end application (based on React) which means at some point they run into an infrastructure problem where they would have CRA boilerplate copies everywhere, which are not customizable and uncontrolled. To solve this issue, you can either create an internal package that will configure its own set of build-tool configurations or eject from CRA. It's also possible to fork CRA, apply your changes and have a bot that will sync your fork with its origin. All of these solutions have far too many drawbacks for real world usage.

While an internal package seems beneficial, it's a rather risky approach, because instead of relying on the black box that is `react-scripts`, you are now taking full responsibility for those build tools and the pitfalls that will follow. Another pet peeve is maintenance. Build tools configurations can be esoteric, which means a select few will be able to maintain it. Given the many years of development Facebook has done on their CLI, it's definitely not worth giving it up for your own proprietary solution.

[Craco](https://github.com/sharegate/craco) to the rescue. Craco essentially replaces `react-scripts` with scripts you can customize, without actually detaching from `react-scripts`. While it solves our main concern, it does not solve the infrastructure problem, where managing more than one application creates a hoard of unmaintainable boilerplate duplication. Hence, this package was born. It allows you to create your own CLI for building and testing, which you can publish and distribute across your organization.

## What You Get

Combined with [Craco](https://github.com/sharegate/craco), this is what you get.

- CRA 3.\* support.
- One stop shop CLI for your React applications.
- Scalable and more future-proof than other solutions.
- Adherence to industry standards without the lock penalty.
- Abstracts away intricate configurations, which helps avoiding configuration pitfalls.
- Setups Jest and Enzyme with real-world configurations, so you can focus on writing tests only.
- Styled-Components configuration for Jest.
- Automatic [Lodash](https://www.azavea.com/blog/2019/03/07/lessons-on-tree-shaking-lodash/) tree shaking.

## Global Imports

When testing, the following modules are imported automatically, hence you don't have to manually import them on every `.spec` file, so you can focus on writing your tests. 🎯

```js
/* React, Enzyme.shallow, Enzyme.mount, Enzyme.render */
```

## Allowed Files

Circumvent CRA restriction when importing files out of `src`, by defining an `allowed-files.json` file at the root of your project. JSON should be an array of _relative_ paths. See [this](https://stackoverflow.com/questions/44114436/the-create-react-app-imports-restriction-outside-of-src-directory) Stack Overflow page and [this](https://github.com/facebook/create-react-app/issues/834) CRA issue for more details. JSON Example 👉:

```json
["../../../../README.md"]
```

## Consumer Apps

Swap existing calls to `react-scripts` in the `scripts` section of your `package.json` file to use your CLI. You can also swap them [automatically](#swapping-scripts-automatically).

```diff
/* package.json */

"scripts": {
-   "start": "react-scripts start",
+   "start": "<your-cli-package> start",
-   "build": "react-scripts build",
+   "build": "<your-cli-package> build",
-   "test": "react-scripts test",
+   "test": "<your-cli-package> test",
}
```

### Available Scripts

Out of the box, every `react-scripts` script will work except for `eject`, as ejecting defeats the purpose of having a custom CLI.

### Extra Scripts

`react-ryo-cli` provides a few extra scripts for your convenience:

```diff
/* package.json */

"scripts": {
+   "build:development": "<your-cli-package> build:development",
+   "build:stats": "<your-cli-package> build:stats",
+   "test:watch": "<your-cli-package> test:watch",
+   "test:update": "<your-cli-package> test:update",
+   "test:production": "<your-cli-package> test:production",
+   "inspect": "<your-cli-package> build --inspect",
+   "inspect:output": "<your-cli-package> build --inspect > output.json",
}
```

### [Swapping Scripts Automatically](#swapping-scripts-automatically)

You can automate this by calling the CLI 🔨:

```console
npx react-ryo-cli update-scripts
```

### Configuration files placement in file structure with default CRA boilerplate

```diff
📦 project
  ┣ 📁 src
  ┣ 📁 public
  ┣ 📜 README.md
  ┣ 📜 yarn.lock
  ┣ 📜 .gitignore
  ┣ 📜 package.json
+ ┣ 📜 craco.config.js
+ ┗ 📜 allowed-files.json
```

## API

If provided CLI arguments are not enough, you can use the API to further customize your CLI package.

### `spawnCli([, options])`

⛔️ Notice the [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>), without it, your CLI entry-point will **_not_** be executable.

```js
#!/usr/bin/env node

require("react-ryo-cli").spawnCli();
```

### _spawnCli Options_

> `outputPath[String]` - Change Webpack output path (Default: `'build'`).

> `withEnzyme[Bool]` - Toggle Enzyme support (Default: `false`).

> `withSignature[Bool]` - Toggle CLI signature (Default: `true`).

> `withStyledComponents[Bool]` - Toggle Styled-Components support for Jest (Default: `false`).

> `signatureTheme[String]` - Select a predefined theme from the list below.

> ![Gradient Themes](https://camo.githubusercontent.com/18c1d596702848aa1d67e95efd41268b1298f7ae/687474703a2f2f6269742e6c792f3275467967724c)

> `signatureGradient[Array]` - Set your own gradient. See [`gradient-string`](https://github.com/bokub/gradient-string#available-built-in-gradients) API. This option takes precedence over `signatureTheme`.
> Default:
>
> ```js
> ["rgb(102, 51, 153)", "rgb(102, 51, 153)"];
> ```

## Contributing

Feel free to submit issues and pull requests. Search existing issues before starting a new one. 🙌

## Versioning

[SemVer](http://semver.org). See [versions available](https://github.com/adi518/react-ryo-cli/releases).

## License

[MIT](https://github.com/adi518/react-ryo-cli/blob/master/LICENSE)
