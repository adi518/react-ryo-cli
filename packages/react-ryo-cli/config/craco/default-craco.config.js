const path = require("path");
const { merge } = require("lodash");
const mergeBabel = require("babel-merge");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const { inspectPlugin } = require("./inspect-plugin");
const { extendJestConfig } = require("../jest/jest_helpers");
const { extendWebpackConfig } = require("../webpack/webpack_helpers");
const {
  safeRequire,
  getScriptArg,
  getParentArgv,
  isBuildScript
} = require("../../lib/helpers");

const parentArgv = getParentArgv();
const script = getScriptArg(parentArgv);
const config = safeRequire(process.env.CONFIG_PATH, {});
const allowedFiles = safeRequire(process.env.ALLOWED_FILES_PATH, []);
const allowedFilesDirname =
  process.env.ALLOWED_FILES_PATH &&
  path.dirname(process.env.ALLOWED_FILES_PATH);

const getDefaultBabelConfig = () =>
  isBuildScript(script) && {
    babel: {
      // transform Lodash imports to tree-shake
      // compatible syntax with `babel-plugin-lodash`.
      // See: https://www.azavea.com/blog/2019/03/07/lessons-on-tree-shaking-lodash/
      plugins: ["lodash"]
    }
  };

const defaultConfig = {
  devServer: {
    open: false
  },
  webpack: {
    configure: (webpackConfigSource, { paths: pathsSource }) => {
      const { webpackConfig, paths } = extendWebpackConfig({
        script,
        pathsSource,
        argv: parentArgv,
        webpackConfigSource
      });
      merge(pathsSource, paths);
      // https://stackoverflow.com/q/44114436/4106263
      // https://stackoverflow.com/a/58321458/4106263
      webpackConfig.resolve.plugins.forEach(plugin => {
        if (plugin instanceof ModuleScopePlugin) {
          allowedFiles.forEach(filePath => {
            console.log(path.join(allowedFilesDirname, filePath));
            plugin.allowedFiles.add(path.join(allowedFilesDirname, filePath));
          });
        }
      });
      return webpackConfig;
    }
  },
  babel: mergeBabel(getDefaultBabelConfig(), config.babel),
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
};

module.exports = defaultConfig;
