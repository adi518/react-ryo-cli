const fs = require("fs");
const fsExtra = require("fs-extra");

const {
  copyFile,
  JSONStringifyPretty,
  getPackageManagerChoice,
  getPackageManagerCommand,
  getConfirmDirectoryNotEmptyChoice
} = require("../lib/cli_helpers");

const { throwError } = require("../lib/utils");
const spawnChild = require("../lib/spawn_child");
const { PACKAGE_JSON } = require("../lib/constants");
const { resolve, resolveCwd } = require("../lib/helpers");
const { CRACO_CONFIG_FILENAME } = require("../lib/constants");

const CLI_BIN_PATH = "index.js";

const CRACO_CONFIG_TARGET_PATH = resolveCwd(CRACO_CONFIG_FILENAME);
const CRACO_CONFIG_TEMPLATE_PATH = resolve(
  "../templates/craco.config.template.js"
);

const INDEX_FILENAME = "index.js";
const INDEX_TARGET_PATH = resolveCwd(INDEX_FILENAME);
const INDEX_TEMPLATE_PATH = resolve("../templates/init.template.js");

const init = async ({ empty }) => {
  const cwd = process.cwd();

  // clear directory if `--empty` flag is set.
  if (empty) fsExtra.emptyDirSync(cwd);

  // avoid unnecessary accidents
  // by checking if target directory
  // is actually empty.
  const files = fs.readdirSync(cwd);
  if (files.length) {
    const choice = await getConfirmDirectoryNotEmptyChoice().catch(throwError);
    if (!choice) return;
  }

  // spawn package manager init script
  const packageManager = await getPackageManagerChoice().catch(throwError);
  const packageManagerCommand = getPackageManagerCommand(packageManager);

  spawnChild(packageManagerCommand, ["init"], {
    stdio: "inherit",
    onError: throwError,
    // apply our boilerplate once package
    // manager "init" script exit successfully.
    onClose: code => {
      if (code) return;
      const packageJSONPath = resolveCwd(PACKAGE_JSON);
      const packageJSON = require(packageJSONPath);
      const package = { ...packageJSON, bin: CLI_BIN_PATH };
      fs.writeFileSync(INDEX_FILENAME);
      fs.writeFileSync(packageJSONPath, JSONStringifyPretty(package));
      copyFile(INDEX_TEMPLATE_PATH, INDEX_TARGET_PATH);
      copyFile(CRACO_CONFIG_TEMPLATE_PATH, CRACO_CONFIG_TARGET_PATH);
    }
  });
};

module.exports = init;
