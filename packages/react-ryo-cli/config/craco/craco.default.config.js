const { merge } = require("lodash");

const { isBuildScript } = require("../../lib/helpers");
const { overrideJestConfig } = require("../jest/jest_helpers");
const { getDefaultBabelConfig } = require("../babel/babel_helpers");
const { overrideWebpackConfig } = require("../webpack/webpack_helpers");
const inspectCracoConfigPlugin = require("./plugins/inspect_craco_config_plugin");

const getDefaultCracoConfig = (
  script,
  { argv, cliOptions, allowedFiles, allowedFilesDirname }
) => ({
  babel: isBuildScript(script) ? getDefaultBabelConfig() : undefined,
  webpack: {
    configure: (webpackConfigSource, { paths: pathsSource }) => {
      const { webpackConfig, paths } = overrideWebpackConfig({
        argv,
        script,
        cliOptions,
        pathsSource,
        allowedFiles,
        allowedFilesDirname,
        webpackConfigSource
      });
      merge(pathsSource, paths);
      return webpackConfig;
    }
  },
  jest: {
    configure: jestConfig => overrideJestConfig(jestConfig, { script })
  },
  plugins: [inspectCracoConfigPlugin]
});

module.exports = { getDefaultCracoConfig };
