const { merge, cloneDeep } = require("lodash");

const { SCRIPTS } = require("../scripts");

const cloneJestConfig = jestConfig => {
  const clone = {
    testMatch: [],
    setupFiles: [],
    setupFilesAfterEnv: [],
    snapshotSerializers: [],
    moduleNameMapper: {},
    collectCoverage: false
  };
  merge(clone, cloneDeep(jestConfig));
  return clone;
};

const extendJestConfig = ({ script, jestConfig: jestConfigSource }) => {
  const jestConfig = cloneJestConfig(jestConfigSource);
  jestConfig.collectCoverage = script === SCRIPTS.BUILD_PRODUCTION;
  jestConfig.testMatch.push("<rootDir>/tests/**/*.{spec,test}.{js,jsx,ts,tsx}");
  jestConfig.setupFiles.push("<rootDir>/node_modules/react-build/config/enzyme/enzyme_setup.js"); // prettier-ignore
  jestConfig.setupFilesAfterEnv.push("<rootDir>/node_modules/react-build/config/jest/jest_setup.js"); // prettier-ignore
  jestConfig.moduleNameMapper["\\.(css|less|scss|sss|styl)$"] = "<rootDir>/node_modules/identity-obj-proxy"; // prettier-ignore
  jestConfig.moduleNameMapper["\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$"] = "<rootDir>/node_modules/react-build/config/jest/fileMock.js"; // prettier-ignore
  jestConfig.snapshotSerializers.push("enzyme-to-json/serializer");
  jestConfig.snapshotSerializers.filter(snapshotSerializer => snapshotSerializer); // prettier-ignore
  return { extendedJestConfig: jestConfig };
};

module.exports = {
  extendJestConfig
};
