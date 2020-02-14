const path = require("path");
const _package = require("../package.json");

const resolve = _path => {
  const basePath =
    _package.name === process.env.npm_package_name
      ? "./"
      : "./node_modules/react-build";
  return path.join(basePath, _path);
};

module.exports = { resolve };
