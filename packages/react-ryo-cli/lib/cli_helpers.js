const fs = require("fs");

const {
  choosePackageManager,
  confirmUpdateScripts,
  confirmDirectoryNotEmptyChoice
} = require("./inquirer");

const { throwError } = require("./utils");

const JSONStringifyPretty = (json, indent = 2) =>
  JSON.stringify(json, null, indent);

const getPackageManagerCommand = packageManager =>
  process.platform === "win32" ? `${packageManager}.cmd` : packageManager;

const copyFile = (sourcePath, targetPath) =>
  fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));

const getPackageManagerChoice = async () => {
  const { packageManager } = await choosePackageManager().catch(throwError);
  return packageManager;
};

const getConfirmDirectoryNotEmptyChoice = async () => {
  const { confirm } = await confirmDirectoryNotEmptyChoice().catch(throwError);
  return confirm;
};

const getConfirmUpdateScripts = async () => {
  const { confirm } = await confirmUpdateScripts().catch(throwError);
  return confirm;
};

module.exports = {
  copyFile,
  JSONStringifyPretty,
  getPackageManagerCommand,
  getPackageManagerChoice,
  getConfirmUpdateScripts,
  getConfirmDirectoryNotEmptyChoice
};
