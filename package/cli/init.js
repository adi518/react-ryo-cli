const fs = require("fs");
const fsExtra = require("fs-extra");
const { spawn } = require("child_process");

const {
  copyFile,
  JSONStringifyPretty,
  getPackageManagerChoice,
  getPackageManagerCommand,
  getConfirmDirectoryNotEmptyChoice
} = require("../lib/cli_helpers");

const { PACKAGE_JSON } = require("../lib/constants");
const { CRACO_CONFIG_FILENAME } = require("../lib/constants");
const { logger, resolve, resolveCwd } = require("../lib/helpers");

const CLI_BIN_PATH = "index.js";

const CRACO_CONFIG_TARGET_PATH = resolveCwd(CRACO_CONFIG_FILENAME);
const CRACO_CONFIG_TEMPLATE_PATH = resolve(
  "../templates/craco.config.template.js"
);

const INDEX_FILENAME = "index.js";
const INDEX_TARGET_PATH = resolveCwd(INDEX_FILENAME);
const INDEX_TEMPLATE_PATH = resolve("../templates/init.template.js");

// apply our boilerplate once package
// manager "init" script exit successfully.
const onClose = code => {
  if (code) return;
  const packageJSONPath = resolveCwd(PACKAGE_JSON);
  const packageJSON = require(packageJSONPath);
  const package = { ...packageJSON, bin: CLI_BIN_PATH };
  fs.writeFileSync(INDEX_FILENAME);
  fs.writeFileSync(packageJSONPath, JSONStringifyPretty(package));
  copyFile(INDEX_TEMPLATE_PATH, INDEX_TARGET_PATH);
  copyFile(CRACO_CONFIG_TEMPLATE_PATH, CRACO_CONFIG_TARGET_PATH);
};

const init = async ({ empty }) => {
  const cwd = process.cwd();

  // clear directory if `--empty` flag is set.
  if (empty) fsExtra.emptyDirSync(cwd);

  // avoid unnecessary accidents
  // by checking if target directory
  // is actually empty.
  const files = fs.readdirSync(cwd);
  if (files.length) {
    const choice = await getConfirmDirectoryNotEmptyChoice();
    if (!choice) return;
  }

  // spawn package manager init script
  const spawnOptions = { stdio: "inherit" };
  const packageManager = await getPackageManagerChoice();
  const packageManagerCommand = getPackageManagerCommand(packageManager);
  const child = spawn(packageManagerCommand, ["init"], spawnOptions);

  child.on("error", logger.error);
  child.on("close", onClose);
};

module.exports = init;
