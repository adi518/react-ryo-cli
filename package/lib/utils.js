const path = require("path");
const pkg = require("../package.json");

const resolve = filePath => {
  const basePath =
    pkg.name === process.env.npm_package_name
      ? "./"
      : `./node_modules/${pkg.name}`;
  return path.join(basePath, filePath);
};

module.exports = { resolve };
