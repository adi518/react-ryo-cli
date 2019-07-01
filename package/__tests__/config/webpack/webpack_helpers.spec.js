const { cloneDeep } = require("lodash");

const {
  getOutputPath,
  extendWebpack
} = require("../../../config/webpack/webpack_helpers.js");

const commonMockArgs = {
  webpackConfig: { output: {} },
  paths: {}
};

describe("extendWebpack", () => {
  test("with build (development) script", () => {
    const mockArgs = {
      ...cloneDeep(commonMockArgs),
      env: { development: true }
    };
    const result = extendWebpack(mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("with build:production script", () => {
    const mockArgs = {
      ...cloneDeep(commonMockArgs)
    };
    const result = extendWebpack(mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("getOutputPath", () => {
    expect(getOutputPath()).toMatchSnapshot();
  });
});
