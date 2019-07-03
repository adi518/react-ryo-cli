// See configuration documentation:
// https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview

// https://github.com/facebook/create-react-app/issues/7227
// https://gist.github.com/adi518/048056495daf508b0253da4ac5ddc921
// https://github.com/styled-components/jest-styled-components#global-installation
// https://github.com/kenshoo/react-core/blob/d5cfb38e334d2bf07ad27be49d68f4b3a76f65b4/.storybook/webpack.config.js

const { merge } = require("lodash");

const { BUILD_SCRIPTS } = require("../scripts");
const { extendJestConfig } = require("../jest/jest_helpers");
const {
  extendWebpack,
  extendCssLoaderOptions
} = require("../webpack/webpack_helpers");

const parentArgv = JSON.parse(process.env.PARENT_ARGV);
const script = parentArgv[2];

const isBuildScript = _script => BUILD_SCRIPTS.includes(_script);

module.exports = {
  devServer: {
    open: false
  },
  style: {
    css: {
      loaderOptions: extendCssLoaderOptions
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
  webpack: {
    configure: (webpackConfig, { paths }) => {
      const { extendedWebpackConfig, extendedPaths } = extendWebpack({
        script,
        paths,
        webpackConfig
      });
      merge(paths, extendedPaths);
      return extendedWebpackConfig;
    }
  },
  jest: {
    configure: jestConfig =>
      extendJestConfig({ script, jestConfig }).extendedJestConfig
  }
};
