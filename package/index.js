#!/usr/bin/env node

// You can use Yalc, which provides a better solution than `yarn link` to develop locally:
// https://github.com/whitecolor/yalc
// https://www.viget.com/articles/how-to-use-local-unpublished-node-packages-as-project-dependencies/

const minimist = require("minimist");
const { spawn } = require("child_process");
const {
  preflight,
  logSignature,
  normalizeScript
} = require("./config/helpers");

// Normalize our scripts to be react-scripts compatible,
// e.g.: `test:production` will be mapped to `test`, and a coverage
// flag will be set to `true` for adding a coverage report in production build.
const argv = process.argv;
const args = minimist(argv.slice(2));
const rawScript = args._[0];
const scriptArgs = [].concat(normalizeScript({ rawScript }));
const restArgs = argv.slice(3);
const allArgs = [...scriptArgs, ...restArgs];

const silentLogger = { log: () => {}, error: () => {} };

if (
  preflight({
    script: rawScript,
    logger: args.inspect ? silentLogger : undefined
  })
) {
  const runScript = spawn("node", allArgs, {
    stdio: "inherit",
    env: { PARENT_ARGV: JSON.stringify(process.argv) }
  });

  runScript.on("error", err => process.exit(err));
  runScript.on("close", code => {
    !args.inspect && logSignature();
    process.exit(code);
  });
}
