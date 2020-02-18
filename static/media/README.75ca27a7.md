![React Ryo CLI](https://raw.githubusercontent.com/adi518/react-ryo-cli/master/react-ryo-cli.png)

# React Ryo CLI (WIP)

React Ryo CLI is a roll-your-own version of the famous [CRA](https://github.com/facebook/create-react-app) ("create-react-app") `react-scripts` CLI, where you can reconfigure internal configurations, such as [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/), and [Jest](https://jestjs.io/). This package is based on [Craco](https://github.com/sharegate/craco). Using the aforementioned third-party, we are able to abstract away the intricacies of cross-industry build tools and their configurations, yet keep a "roll-your-own" approach to apply fine-grain changes to suit our specific needs. While [Vue.js](https://cli.vuejs.org/) already incorporated customizability in its CLI, Facebook does not think it should, hence solutions like Craco have emerged, followed by this package.

## Usage

Execute the following command to create a boilerplate for your own CLI package.

```console
npx react-ryo-cli --init
```

### Configuration

Create a `craco.config.js` file at the root of your package and `react-ryo-cli` will pick it up. See Craco docs for its [configuration API](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-overview). Your configuration will be merged with `react-ryo-cli` default configuration. However, you can choose to opt-out by calling `spawnApi` with `{ noExtend: true }` or by calling your CLI with the `--noExtend` argument.

## Why

TL;DR: Create your own one stop shop CLI for building and testing your [React.js](https://reactjs.org/) applications.

Many software companies develop more than one front-end application (based on React) which means at some point they run into an infrastructure problem where they would have CRA boilerplate copies everywhere, which are not customizable and uncontrolled. To solve this issue, you can either create an internal package that will configure its own set of build-tool configurations or eject from CRA. It's also possible to fork CRA, apply your changes and have a bot that will sync your fork with its origin. All of these solutions have far too many drawbacks for real world usage.

While an internal package seems beneficial, it's a rather risky approach, because instead of relying on the black box that is `react-scripts`, you are now taking full responsibility for those build tools and the pitfalls that will follow. Another pet peeve is maintenance. Build tools configurations can be esoteric, which means a select few will be able to maintain it. Given the many years of development Facebook has done on their CLI, it's definitely not worth giving it up for your own proprietary solution.

[Craco](https://github.com/sharegate/craco) to the rescue. Craco essentially replaces `react-scripts` with scripts you can customize, without actually detaching from `react-scripts`. While it solves our main concern, it does not solve the infrastructure problem, where managing more than one application creates a hoard of unmaintainable boilerplate duplication. Hence, this package was born. It allows you to create your own CLI for building and testing, which you can publish and distribute across your organization.

## What You Get

Combined with [Craco](https://github.com/sharegate/craco), this is what you get.

- One stop shop CLI for your React applications.
- Scalable and more future-proof than other solutions.
- Adherence to industry standards without the lock penalty.
- Abstracts away intricate configurations, which helps avoiding configuration pitfalls.
- Setups Jest and Enzyme with real-world configurations, so you can focus on writing tests only.
- Automatic [Lodash](https://www.azavea.com/blog/2019/03/07/lessons-on-tree-shaking-lodash/) tree shaking.

## Global Imports

When testing, the following modules are imported automatically, so you don't have to manually import them on every `.spec` file, just write your tests.

```js
// The following modules are imported on every `*.spec` file.
/* global
React,
Enzyme.shallow,
Enzyme.mount,
Enzyme.render
*/
```

## Allowed Files

Circumvent CRA restriction when importing files out of `src`, by defining a `allowed-files.json` file. See [this](https://stackoverflow.com/questions/44114436/the-create-react-app-imports-restriction-outside-of-src-directory) Stack Overflow page for details.

## API

### _spawnCli_ \[Function\]

```js
#!/usr/bin/env node
require("react-ryo-cli").spawnCli([, options]);
```

### _spawnCli Options_ \[Object\]

#### `withEnzyme` \[Boolean\]

Toggle Enzyme support.

#### `withStyledComponents` \[Boolean\]

Toggle Styled-Components support.

#### `withSignature` \[Boolean\]

Toggle CLI signature.

#### `signatureTheme` \[String\]

See [`gradient-string`](https://github.com/bokub/gradient-string#available-built-in-gradients) docs for a list of possible values or quick check the snapshot below.

![](https://camo.githubusercontent.com/18c1d596702848aa1d67e95efd41268b1298f7ae/687474703a2f2f6269742e6c792f3275467967724c)

## License

[MIT](https://github.com/adi518/react-ryo-cli/blob/master/LICENSE)
