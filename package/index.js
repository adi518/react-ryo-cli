#!/usr/bin/env node

// You can use Yalc, which provides a better solution than `yarn link` to develop locally:
// https://github.com/whitecolor/yalc
// https://www.viget.com/articles/how-to-use-local-unpublished-node-packages-as-project-dependencies/

// Known issues:
// https://github.com/browserslist/browserslist/issues/382
// Temporary solution:
// https://github.com/ben-eb/caniuse-lite/issues/27#issuecomment-503023016

const { spawn } = require("child_process");
const { preflight, normalizeScript } = require("./config/helpers");

// Normalize our scripts to be react-scripts compatible,
// e.g.: `test:production` will be mapped to `test`, and a coverage
// flag will be set to `true` for adding a coverage report in production build.
const rawScript = process.argv[2];
const scriptArgs = [].concat(normalizeScript({ rawScript }));
const restArgs = [...process.argv].slice(3);
const args = [
  ...scriptArgs,
  ...restArgs,
  JSON.stringify({ parentArgv: process.argv })
];

if (preflight({ script: rawScript })) {
  const runScript = spawn("node", args, { stdio: "inherit" });

  runScript.on("error", error => process.exit(error));
  runScript.on("close", data => process.exit(data));
}
