const { merge, cloneDeep } = require("lodash");
const SCRIPTS = require("../scripts");

const getPureJestConfig = jestConfig =>
  merge(
    {
      testMatch: [],
      setupFiles: [],
      setupFilesAfterEnv: [],
      moduleNameMapper: {},
      snapshotSerializers: [],
      collectCoverage: null
    },
    cloneDeep(jestConfig)
  );

const extendJestConfig = ({ jestConfig: jestConfigSource, script }) => {
  const jestConfig = getPureJestConfig(jestConfigSource);
  jestConfig.testMatch.push("<rootDir>/tests/**/*.{spec,test}.{js,jsx,ts,tsx}");
  jestConfig.setupFiles.push("<rootDir>/node_modules/react-build/config/enzyme/enzyme_setup.js"); // prettier-ignore
  jestConfig.setupFilesAfterEnv.push("<rootDir>/node_modules/react-build/config/jest/jest_setup.js"); // prettier-ignore
  jestConfig.moduleNameMapper["\\.(css|less|scss|sss|styl)$"] = "<rootDir>/node_modules/identity-obj-proxy"; // prettier-ignore
  jestConfig.moduleNameMapper[
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$"
  ] = "<rootDir>/node_modules/react-build/config/jest/fileMock.js";
  jestConfig.snapshotSerializers = []
    .concat(jestConfig.snapshotSerializers, "enzyme-to-json/serializer")
    .filter(snapshotSerializer => snapshotSerializer); // shake false entries
  jestConfig.collectCoverage = script === SCRIPTS.TEST_PRODUCTION;
  return jestConfig;
};

module.exports = {
  extendJestConfig
};
