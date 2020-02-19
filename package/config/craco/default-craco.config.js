const path = require("path");
const { merge } = require("lodash");
const { inspectPlugin } = require("./inspect-plugin");
const { extendJestConfig } = require("../jest/jest_helpers");
const { extendWebpackConfig } = require("../webpack/webpack_helpers");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const {
  safeRequire,
  getScriptArg,
  getParentArgv,
  isBuildScript
} = require("../../lib/helpers");

const parentArgv = getParentArgv();
const script = getScriptArg(parentArgv);
const config = safeRequire(process.env.CONFIG_PATH) || {};
const allowedFiles = safeRequire(process.env.ALLOWED_FILES_PATH) || [];
const allowedFilesDirname =
  process.env.ALLOWED_FILES_PATH &&
  path.dirname(process.env.ALLOWED_FILES_PATH);

const defaultConfig = {
  devServer: {
    open: false
  },
  webpack: {
    configure: (webpackConfig, { paths }) => {
      const { extendedWebpackConfig, extendedPaths } = extendWebpackConfig({
        argv: parentArgv,
        script,
        paths,
        webpackConfig
      });
      merge(paths, extendedPaths);
      // https://stackoverflow.com/q/44114436/4106263
      // https://stackoverflow.com/a/58321458/4106263
      extendedWebpackConfig.resolve.plugins.forEach(plugin => {
        if (plugin instanceof ModuleScopePlugin) {
          allowedFiles.forEach(file =>
            plugin.allowedFiles.add(path.join(allowedFilesDirname, file))
          );
        }
      });
      return extendedWebpackConfig;
    }
  },
  ...(isBuildScript(script) && {
    babel: {
      // Transform Lodash imports to tree-shaking
      // compatible syntax with babel-plugin-lodash.
      // See: https://www.azavea.com/blog/2019/03/07/lessons-on-tree-shaking-lodash/
      plugins: ["lodash"]
    }
  }),
  jest: {
    configure: jestConfig => extendJestConfig({ source: jestConfig, script })
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: inspectPlugin
      }
    }
  ]
};

const mergedConfig = merge({}, defaultConfig, config);

module.exports = mergedConfig;
