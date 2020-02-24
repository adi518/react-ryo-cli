const path = require("path");
const { merge } = require("lodash");
const mergeBabel = require("babel-merge");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const { inspectPlugin } = require("./inspect-plugin");
const { isBuildScript } = require("../../lib/helpers");
const { extendJestConfig } = require("../jest/jest_helpers");
const { extendWebpackConfig } = require("../webpack/webpack_helpers");

const getDefaultBabelConfig = script =>
  isBuildScript(script) && {
    babel: {
      // transform Lodash imports to tree-shake
      // compatible syntax with `babel-plugin-lodash`.
      // See: https://www.azavea.com/blog/2019/03/07/lessons-on-tree-shaking-lodash/
      plugins: ["lodash"]
    }
  };

const getDefaultCracoConfig = (
  script,
  { argv, cliOptions, cwdConfig, allowedFiles, allowedFilesDirname }
) => ({
  babel: mergeBabel(getDefaultBabelConfig(script), cwdConfig.babel),
  webpack: {
    configure: (webpackConfigSource, { paths: pathsSource }) => {
      const { webpackConfig, paths } = extendWebpackConfig({
        argv,
        script,
        cliOptions,
        pathsSource,
        webpackConfigSource
      });
      merge(pathsSource, paths);
      // https://stackoverflow.com/q/44114436/4106263
      // https://stackoverflow.com/a/58321458/4106263
      webpackConfig.resolve.plugins.forEach(plugin => {
        if (plugin instanceof ModuleScopePlugin) {
          allowedFiles.forEach(filePath =>
            plugin.allowedFiles.add(path.join(allowedFilesDirname, filePath))
          );
        }
      });
      return webpackConfig;
    }
  },
  jest: {
    configure: jestConfig => extendJestConfig(jestConfig, { script })
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: inspectPlugin
      }
    }
  ]
});

module.exports = { getDefaultCracoConfig };
