const fs = require("fs");
const path = require("path");

const JSONStringifyPretty = object => JSON.stringify(object, null, 2);

const resolveCwd = filePath => path.join(process.cwd(), filePath);

const getPackageManagerCommand = packageManager =>
  process.platform === "win32" ? `${packageManager}.cmd` : packageManager;

const copyFile = (sourcePath, targetPath) =>
  fs.createReadStream(sourcePath).pipe(fs.createWriteStream(targetPath));

module.exports = {
  copyFile,
  resolveCwd,
  JSONStringifyPretty,
  getPackageManagerCommand
};
