#!/usr/bin/env node

// https://medium.com/p/6dcdf705f8b1/responses/show
// https://github.com/tailwindcss/tailwindcss/issues/280
// https://github.com/electron-userland/electron-forge/issues/1098
// https://github.com/mattdesl/spawn-npm-install/blob/master/index.js#L29
// https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
// https://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js

// to use V8's code cache to speed up instantiation time
// https://github.com/eslint/eslint/blob/d89390b75e3e9993f347387a49b0ac5550f45c7f/bin/eslint.js
require("v8-compile-cache");

const init = require("../cli/init");
const { logger } = require("../lib/logger");
const { logSignature } = require("../lib/signature");
const updateScripts = require("../cli/update_scripts");
const { getArgv, getScriptArg } = require("../lib/helpers");

const argv = getArgv();
const script = getScriptArg();

const is = option => option === script;

const main = () => {
  try {
    if (is("init")) init(argv);
    if (is("update-scripts")) updateScripts(argv);
  } catch (err) {
    logger.error(err);
  }
  logSignature();
};

main();
