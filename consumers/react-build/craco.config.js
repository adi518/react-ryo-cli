// See configuration documentation:
// https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview

// https://github.com/facebook/create-react-app/issues/7227
// https://gist.github.com/adi518/048056495daf508b0253da4ac5ddc921
// https://github.com/styled-components/jest-styled-components#global-installation
// https://github.com/kenshoo/react-core/blob/d5cfb38e334d2bf07ad27be49d68f4b3a76f65b4/.storybook/webpack.config.js

// const { extendJestConfig } = require("../jest/jest_helpers");
const path = require("path");
const allowedFiles = require("./allowed-files");
// const { mergeDeep } = require("react-ryo-cli");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

// const getKenshooCssLoaderOptions = () => ({
//   modules: {
//     localIdentName: "kn-[name]__[local]___[hash:base64:5]"
//   }
// });

module.exports = {
  // style: {
  //   css: {
  //     loaderOptions: cssLoaderOptions =>
  //       mergeDeep(cssLoaderOptions, getKenshooCssLoaderOptions())
  //   }
  // },
  webpack: {
    configure: webpackConfig => {
      // https://stackoverflow.com/q/44114436/4106263
      // https://stackoverflow.com/a/58321458/4106263
      webpackConfig.resolve.plugins.forEach(plugin => {
        if (plugin instanceof ModuleScopePlugin) {
          allowedFiles.forEach(file =>
            plugin.allowedFiles.add(path.join(__dirname, file))
          );
        }
      });
      return webpackConfig;
    }
  }
};
