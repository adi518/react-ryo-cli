const path = require("path");
const { cloneDeep } = require("lodash");

const getOutputPath = () => path.join(process.cwd(), "out");

const extendWebpack = ({
  webpackConfig: webpackConfigSource,
  paths: pathsSource,
  env = { development: false }
}) => {
  const paths = cloneDeep(pathsSource);
  const webpackConfig = cloneDeep(webpackConfigSource);
  // CRA does not provide a "development" build,
  // so we convert their "build" command,
  // which builds an optimized production build,
  // to an unoptimized development build.
  if (env.development) {
    webpackConfig.mode = "development";
    webpackConfig.devtool = "eval-source-map";
  }
  webpackConfig.output.path = getOutputPath();
  paths.appBuild = getOutputPath();
  return { extendedWebpackConfig: webpackConfig, extendedPaths: paths };
};

const extendCssLoaderOptions = cssLoaderOptions => {
  cssLoaderOptions.modules = true;
  cssLoaderOptions.localIdentName = "kn-[name]__[local]___[hash:base64:5]"; // prettier-ignore
  return cssLoaderOptions;
};

module.exports = {
  getOutputPath,
  extendWebpack,
  extendCssLoaderOptions
};
