#!/usr/bin/env node

// https://medium.com/p/6dcdf705f8b1/responses/show
// https://github.com/tailwindcss/tailwindcss/issues/280
// https://github.com/electron-userland/electron-forge/issues/1098
// https://github.com/mattdesl/spawn-npm-install/blob/master/index.js#L29
// https://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js

const fs = require("fs");
const { spawn } = require("child_process");
const { resolve } = require("../lib/helpers");

const { selectPackageManager } = require("../cli/inquirer");
const { CRACO_CONFIG_FILENAME } = require("../lib/helpers");
const {
  copyFile,
  resolveCwd,
  JSONStringifyPretty,
  getPackageManagerCommand
} = require("../cli/cli_helpers");

const CLI_BIN_PATH = "index.js";

const CRACO_CONFIG_TARGET_PATH = resolveCwd(CRACO_CONFIG_FILENAME);
const CRACO_CONFIG_TEMPLATE_PATH = resolve("../cli/craco.config.template.js");

const INDEX_FILENAME = "index.js";
const INDEX_TARGET_PATH = resolveCwd(INDEX_FILENAME);
const INDEX_TEMPLATE_PATH = resolve("../cli/template.js");

const getPackageMangerSelection = async () => {
  const { packageManager } = await selectPackageManager().catch(err =>
    console.error(err)
  );
  return packageManager;
};

const init = async () => {
  const spawnOptions = { stdio: "inherit" };
  const packageManager = await getPackageMangerSelection();
  const packageManagerCommand = getPackageManagerCommand(packageManager);
  const childProcess = spawn(packageManagerCommand, ["init"], spawnOptions);
  const onError = err => process.exit(err);
  const onClose = code => {
    if (code) return void 0;
    const packageJSONPath = resolveCwd("package.json");
    const packageJSON = fs.readFileSync(packageJSONPath);
    const package = JSON.parse(packageJSON);
    package.bin = CLI_BIN_PATH;
    fs.writeFileSync(INDEX_FILENAME);
    fs.writeFileSync(packageJSONPath, JSONStringifyPretty(package));
    copyFile(INDEX_TEMPLATE_PATH, INDEX_TARGET_PATH);
    copyFile(CRACO_CONFIG_TEMPLATE_PATH, CRACO_CONFIG_TARGET_PATH);
  };
  childProcess.on("error", onError);
  childProcess.on("close", onClose);
};

const main = () => {
  if (process.argv.includes("init")) init();
};

main();
