const fs = require("fs");
const fsExtra = require("fs-extra");

const {
  copyFile,
  saveFile,
  JSONStringifyPretty,
  getPackageManagerChoice,
  getPackageManagerCommand,
  getConfirmDirectoryNotEmptyChoice,
  getConfirmInstallCracoPeerDepChoice
} = require("../cli_helpers");

const { throwError } = require("../../lib/utils");
const spawnChild = require("../../lib/spawn_child");
const { PACKAGE_JSON } = require("../../lib/constants");
const { resolve, resolveCwd } = require("../../lib/helpers");
const {
  PACKAGE_MANAGERS,
  CRACO_CONFIG_FILENAME
} = require("../../lib/constants");

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

  const packageManager = await getPackageManagerChoice().catch(throwError);
  const packageManagerBin = getPackageManagerCommand(packageManager);

  const initPackage = () => {
    spawnChild(packageManagerBin, ["init"], {
      onClose: code => {
        if (code) return;
        installCraco();
        copyBoilerplate();
      }
    });
  };

  const installCraco = async () => {
    const choice = await getConfirmInstallCracoPeerDepChoice().catch(
      throwError
    );
    if (!choice) return;
    const addCommand =
      packageManager === PACKAGE_MANAGERS.NPM ? "install" : "add";
    spawnChild(packageManagerBin, [addCommand, "@craco/craco"]);
  };

  const copyBoilerplate = () => {
    const packageJSONPath = resolveCwd(PACKAGE_JSON);
    const packageJSONSource = require(packageJSONPath);
    const packageJSON = {
      ...packageJSONSource,
      bin: CLI_BIN_PATH,
      peerDependencies: { "react-scripts": "*" }
    };
    saveFile(INDEX_FILENAME);
    saveFile(packageJSONPath, JSONStringifyPretty(packageJSON));
    copyFile(INDEX_TEMPLATE_PATH, INDEX_TARGET_PATH);
    copyFile(CRACO_CONFIG_TEMPLATE_PATH, CRACO_CONFIG_TARGET_PATH);
  };

  // spawn package manager "init" script
  // install peer dependency "@craco/craco"
  // and apply our boilerplate once package
  // both scripts exit successfully.
  initPackage();
};

module.exports = init;
