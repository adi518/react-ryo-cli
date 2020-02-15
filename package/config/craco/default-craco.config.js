const { merge } = require("lodash");
const { inspectPlugin } = require("./inspect-plugin");
const { extendJestConfig } = require("../jest/jest_helpers");
const { extendWebpackConfig } = require("../webpack/webpack_helpers");
const {
  getParentArgv,
  getScript,
  isBuildScript
} = require("../../lib/helpers");

const script = getScript();
const parentArgv = getParentArgv();
const config = require(process.env.CONFIG_PATH);
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
