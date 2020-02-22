const pkg = require("../../package.json");
const { SCRIPTS } = require("react-ryo-cli");
const { cloneDeep } = require("lodash");

const extendJestConfig = (source, { script }) => {
  const jestConfig = cloneDeep(source);
  jestConfig.collectCoverage = script === SCRIPTS.BUILD;
  jestConfig.setupFiles = [].concat(
    jestConfig.setupFiles,
    `<rootDir>/node_modules/${pkg.name}/config/enzyme/enzyme_setup.js`
  );
  jestConfig.setupFilesAfterEnv = [].concat(
    jestConfig.setupFilesAfterEnv,
    `<rootDir>/node_modules/${pkg.name}/config/jest/jest_setup.js`
  );
  jestConfig.moduleNameMapper["\\.(css|less|scss|sss|styl)$"] =
    "<rootDir>/node_modules/identity-obj-proxy";
  jestConfig.snapshotSerializers = []
    .concat(jestConfig.snapshotSerializers, "enzyme-to-json/serializer")
    .filter(snapshotSerializer => snapshotSerializer);
  return jestConfig;
};

module.exports = {
  extendJestConfig
};
