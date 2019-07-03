const { cloneDeep } = require("lodash");

const { SCRIPTS } = require("../../../config/scripts");
const { extendJestConfig } = require("../../../config/jest/jest_helpers");

const commonMockArgs = {
  jestConfig: {
    testMatch: [],
    setupFiles: [],
    setupFilesAfterEnv: [],
    moduleNameMapper: {},
    snapshotSerializers: [],
    collectCoverage: null
  }
};

describe("extendJestConfig", () => {
  test("with build (development) script", () => {
    const mockArgs = {
      ...cloneDeep(commonMockArgs),
      script: SCRIPTS.BUILD
    };
    const result = extendJestConfig(mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("with build:production script", () => {
    const mockArgs = {
      ...cloneDeep(commonMockArgs),
      script: SCRIPTS.BUILD_PRODUCTION
    };
    const result = extendJestConfig(mockArgs);

    expect(result).toMatchSnapshot();
  });
});
