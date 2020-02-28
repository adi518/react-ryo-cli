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
  const jestConfig = cloneDeep(source);
  jestConfig.collectCoverage = script === SCRIPTS.BUILD;
  jestConfig.setupFiles = concat(jestConfig.setupFiles, ENZYME_SETUP_PATH);
  jestConfig.setupFilesAfterEnv = concat(
    jestConfig.setupFilesAfterEnv,
    JEST_SETUP_PATH
  );
  jestConfig.moduleNameMapper["\\.(css|less|scss|sss|styl)$"] = require.resolve(
    "identity-obj-proxy"
  );
  jestConfig.snapshotSerializers = []
    .concat(jestConfig.snapshotSerializers, "enzyme-to-json/serializer")
    .filter(snapshotSerializer => snapshotSerializer);
  return jestConfig;
};

module.exports = { overrideJestConfig };
