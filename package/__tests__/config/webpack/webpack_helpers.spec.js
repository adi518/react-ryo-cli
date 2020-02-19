const slash = require("slash");

const { SCRIPTS } = require("../../../config/scripts");

const {
  extendWebpack,
  getOutputPath,
  extendCssLoaderOptions
} = require("../../../config/webpack/webpack_helpers.js");

const commonMockArgs = {
  webpackConfig: {
    entry: ["index.js"],
    output: {}
  },
  paths: {},
  getOutputPath: () => slash(getOutputPath({ cwd: "/app" }))
};

const getMockArgs = options => Object.assign({}, commonMockArgs, options);

jest.mock("../../../config/helpers", () => ({
  ...jest.requireActual("../../../config/helpers"),
  getLibraryName: () => "react-core"
}));

describe("extendWebpack", () => {
  test("with build (development) script", () => {
    const mockArgs = getMockArgs({ script: SCRIPTS.BUILD });
    const result = extendWebpack(mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("with build script", () => {
    const mockArgs = getMockArgs({ script: SCRIPTS.BUILD });
    const result = extendWebpack(mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("with build:development script", () => {
    const mockArgs = getMockArgs({ script: SCRIPTS.BUILD_DEVELOPMENT });
    const result = extendWebpack(mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("with build:package script", () => {
    const mockArgs = getMockArgs({ script: SCRIPTS.BUILD_PACKAGE });
    const result = extendWebpack(mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("with build:package:development script", () => {
    const mockArgs = getMockArgs({ script: SCRIPTS.BUILD_PACKAGE_DEVELOPMENT });
    const result = extendWebpack(mockArgs);

    expect(result).toMatchSnapshot();
  });

  test("extendCssLoaderOptions", () => {
    expect(extendCssLoaderOptions()).toMatchSnapshot();
  });

  test("getOutputPath", () => {
    expect(slash(getOutputPath({ cwd: "/app" }))).toMatchSnapshot();
  });
});
