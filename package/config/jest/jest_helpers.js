const pkg = require("../../package.json");
const { SCRIPTS } = require("react-ryo-cli");
const { cloneDeep } = require("lodash");

const extendJestConfig = (source, { script }) => {
  const jestConfig = cloneDeep(source);
  jestConfig.collectCoverage = script === SCRIPTS.BUILD;
  jestConfig.setupFiles.push(`<rootDir>/node_modules/${pkg.name}/config/enzyme/enzyme_setup.js`); // prettier-ignore
  jestConfig.setupFilesAfterEnv.push(`<rootDir>/node_modules/${pkg.name}/config/jest/jest_setup.js`); // prettier-ignore
  jestConfig.moduleNameMapper["\\.(css|less|scss|sss|styl)$"] = "<rootDir>/node_modules/identity-obj-proxy"; // prettier-ignore
  jestConfig.snapshotSerializers
    .push("enzyme-to-json/serializer")
    .filter(snapshotSerializer => snapshotSerializer);
  return jestConfig;
};

module.exports = {
  extendJestConfig
};
