#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the `react-ryo-cli` command.
 * @author Adi Sahar
 */

// https://github.com/tailwindcss/tailwindcss/issues/280

// to use V8's code cache to speed up instantiation time
// https://github.com/eslint/eslint/blob/d89390b75e3e9993f347387a49b0ac5550f45c7f/bin/eslint.js
require("v8-compile-cache");

const init = require("../cli/scripts/init");
const updateScripts = require("../cli/scripts/update_scripts");

const { logger } = require("../lib/logger");
const { logSignature } = require("../lib/signature");
const { getArgv, getScriptArg } = require("../lib/helpers");

const argv = getArgv();
const script = getScriptArg();

const is = option => option === script;

const main = () => {
  if (is("init")) init(argv).catch(logger.error);
  if (is("update-scripts")) updateScripts(argv).catch(logger.error);
  logSignature();
};

main();
