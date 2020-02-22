const fs = require("fs");

const {
  choosePackageManager,
  confirmDirectoryNotEmptyChoice
} = require("./inquirer");

const { logger } = require("./helpers");

const JSONStringifyPretty = (json, indent = 2) =>
  JSON.stringify(json, null, indent);

const getPackageManagerCommand = packageManager =>
  process.platform === "win32" ? `${packageManager}.cmd` : packageManager;

const copyFile = (sourcePath, targetPath) =>
  fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));

const getPackageManagerChoice = async () => {
  const { packageManager } = await choosePackageManager().catch(logger.error);
  return packageManager;
};

const getConfirmDirectoryNotEmptyChoice = async () => {
  const { confirm } = await confirmDirectoryNotEmptyChoice().catch(
    logger.error
  );
  return confirm;
};

module.exports = {
  copyFile,
  resolveCwd,
  JSONStringifyPretty,
  getPackageManagerChoice,
  getPackageManagerCommand,
  getConfirmDirectoryNotEmptyChoice
};
