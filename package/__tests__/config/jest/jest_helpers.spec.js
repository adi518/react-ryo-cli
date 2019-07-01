const { cloneDeep } = require("lodash");

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
      ...cloneDeep(commonMockArgs)
    };
    const result = extendJestConfig(mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("with build:production script", () => {
    const mockArgs = {
      ...cloneDeep(commonMockArgs),
      env: { production: true }
    };
    const result = extendJestConfig(mockArgs);

    expect(result).toMatchSnapshot();
  });
});
