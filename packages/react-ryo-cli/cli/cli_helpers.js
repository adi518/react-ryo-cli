const fs = require("fs");

const {
  choosePackageManager,
  confirmUpdateScripts,
  confirmInstallCracoPeerDep,
  confirmDirectoryNotEmptyChoice
} = require("./inquirer");

const { throwError } = require("../lib/utils");

const JSONStringifyPretty = (json, indent = 2) =>
  JSON.stringify(json, null, indent);

// https://github.com/mattdesl/spawn-npm-install/blob/master/index.js#L29
const getPackageManagerCommand = packageManager =>
  process.platform === "win32" ? `${packageManager}.cmd` : packageManager;

// https://stackoverflow.com/questions/11293857/fastest-way-to-copy-file-in-node-js
const copyFile = (sourcePath, targetPath) =>
  fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));

const saveFile = (targetPath, content) => fs.writeFileSync(targetPath, content);

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

const getConfirmInstallCracoPeerDepChoice = async () => {
  const { confirm } = await confirmInstallCracoPeerDep().catch(throwError);
  return confirm;
};

module.exports = {
  copyFile,
  saveFile,
  JSONStringifyPretty,
  getPackageManagerCommand,
  getPackageManagerChoice,
  getConfirmUpdateScripts,
  getConfirmDirectoryNotEmptyChoice,
  getConfirmInstallCracoPeerDepChoice
};
