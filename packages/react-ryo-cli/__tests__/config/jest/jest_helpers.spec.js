const { cloneDeep } = require("lodash");

const { SCRIPTS } = require("../../../lib/constants");
const { overrideJestConfig } = require("../../../config/jest/jest_helpers");

const commonMockArgs = {
  testMatch: [],
  setupFiles: [],
  setupFilesAfterEnv: [],
  moduleNameMapper: {},
  snapshotSerializers: [],
  collectCoverage: null
};

describe("overrideJestConfig", () => {
  test("with build script", () => {
    const mockArgs = [cloneDeep(commonMockArgs), { script: SCRIPTS.BUILD }];
    const result = overrideJestConfig(...mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("with build:development script", () => {
    const mockArgs = [
      cloneDeep(commonMockArgs),
      { script: SCRIPTS.BUILD_DEVELOPMENT }
    ];
    const result = overrideJestConfig(...mockArgs);

    expect(result).toMatchSnapshot();
  });
});
