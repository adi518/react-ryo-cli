#!/usr/bin/env node

// https://github.com/tailwindcss/tailwindcss/issues/280
// https://github.com/electron-userland/electron-forge/issues/1098
// https://github.com/mattdesl/spawn-npm-install/blob/master/index.js#L29
// https://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const { selectPackageManager } = require("../lib/inquirer");
const { CRACO_CONFIG_FILENAME } = require("../lib/helpers");
const {
  resolveCwd,
  JSONStringifyPretty,
  getPackageManagerCommand
} = require("../lib/cli_helpers");

const CLI_BIN_PATH = "index.js";
const CRACO_CONFIG_PATH = resolveCwd(CRACO_CONFIG_FILENAME);
const CRACO_CONFIG_TEMPLATE = {};

const INDEX_FILENAME = "index.js";
const INDEX_TARGET_PATH = resolveCwd(INDEX_FILENAME);
const INDEX_TEMPLATE_PATH = path.join(__dirname, "../cli/template.js");

const main = async () => {
  if (process.argv.includes("init")) {
    try {
      const spawnOptions = { stdio: "inherit" };
      const { packageManager } = await selectPackageManager();
      const packageManagerCommand = getPackageManagerCommand(packageManager);
      const initProcess = spawn(packageManagerCommand, ["init"], spawnOptions);
      const onError = err => process.exit(err);
      const onClose = code => {
        if (code) return void 0;
        const packageJSONPath = path.join(process.cwd(), "package.json");
        const packageJSON = fs.readFileSync(packageJSONPath);
        const package = JSON.parse(packageJSON);
        package.bin = CLI_BIN_PATH;
        fs.writeFileSync(INDEX_FILENAME);
        fs.writeFileSync(packageJSONPath, JSONStringifyPretty(package));
        fs.writeFileSync(CRACO_CONFIG_PATH, JSONStringifyPretty(CRACO_CONFIG_TEMPLATE)); // prettier-ignore
        fs.createReadStream(INDEX_TEMPLATE_PATH).pipe(fs.createWriteStream(INDEX_TARGET_PATH)); // prettier-ignore
      };
      initProcess.on("error", onError);
      initProcess.on("close", onClose);
    } catch (err) {
      console.error(err);
    }
  }
};

main();
