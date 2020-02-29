const slash = require("slash");

const { SCRIPTS } = require("../../../lib/constants");

const {
  getOutputPath,
  overrideWebpackConfig
} = require("../../../config/webpack/webpack_helpers.js");

console.log(getOutputPath(undefined, { cwd: "/app" }));

const commonMockArgs = {
  paths: {},
  cliOptions: {},
  source: {
    output: {},
    entry: ["index.js"],
    resolve: { plugins: [] }
  },
  getOutputPath: () => slash(getOutputPath(undefined, { cwd: "/app" }))
};

const getMockArgs = options => ({ ...commonMockArgs, ...options });

jest.mock("../../../lib/helpers", () => ({
  ...jest.requireActual("../../../lib/helpers"),
  getLibraryName: () => "react-core"
}));

describe("overrideWebpackConfig", () => {
  test("with build script", () => {
    const { source, ...options } = getMockArgs({ script: SCRIPTS.BUILD });
    const result = overrideWebpackConfig(source, options);

    expect(result).toMatchSnapshot();
  });

  test("with build:development script", () => {
    const { source, ...options } = getMockArgs({
      script: SCRIPTS.BUILD_DEVELOPMENT
    });
    const result = overrideWebpackConfig(source, options);

    expect(result).toMatchSnapshot();
  });

  test("with build:package script", () => {
    const { source, ...options } = getMockArgs({
      script: SCRIPTS.BUILD_PACKAGE,
      argv: { name: "react-core" }
    });
    const result = overrideWebpackConfig(source, options);

    expect(result).toMatchSnapshot();
  });

  test("with build:package:development script", () => {
    const { source, ...options } = getMockArgs({
      script: SCRIPTS.BUILD_PACKAGE_DEVELOPMENT,
      argv: { name: "react-core" }
    });
    const result = overrideWebpackConfig(source, options);

    expect(result).toMatchSnapshot();
  });

  test("getOutputPath", () => {
    expect(slash(getOutputPath(undefined, { cwd: "/app" }))).toMatchSnapshot();
  });
});
