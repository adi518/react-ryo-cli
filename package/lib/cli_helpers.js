const path = require("path");

const JSONStringifyPretty = object => JSON.stringify(object, null, 2);

const resolveCwd = filePath => path.join(process.cwd(), filePath);

const getPackageManagerCommand = packageManager =>
  process.platform === "win32" ? `${packageManager}.cmd` : packageManager;

module.exports = {
  resolveCwd,
  JSONStringifyPretty,
  getPackageManagerCommand
};
