const pkg = require("../../package.json");
const { SCRIPTS } = require("react-ryo-cli");
const { concat, cloneDeep } = require("lodash");

const ENZYME_SETUP_PATH = require.resolve(
  `${pkg.name}/config/enzyme/enzyme_setup.js`
);

const JEST_SETUP_PATH = require.resolve(
  `${pkg.name}/config/jest/jest_setup.js`
);

const overrideJestConfig = (source, { script }) => {
  const config = cloneDeep(source);
  config.collectCoverage = script === SCRIPTS.BUILD;
  config.setupFiles = concat(config.setupFiles, ENZYME_SETUP_PATH);
  config.setupFilesAfterEnv = concat(
    config.setupFilesAfterEnv,
    JEST_SETUP_PATH
  );
  config.moduleNameMapper["\\.(css|less|scss|sss|styl)$"] = require.resolve(
    "identity-obj-proxy"
  );
  config.snapshotSerializers = []
    .concat(config.snapshotSerializers, "enzyme-to-json/serializer")
    .filter(snapshotSerializer => snapshotSerializer);
  return config;
};

module.exports = { overrideJestConfig };
