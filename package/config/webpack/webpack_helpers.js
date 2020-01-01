const path = require("path");
const { merge, cloneDeep } = require("lodash");

const {
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
} = require("../scripts");
const { getLibraryName } = require("../helpers");

/* eslint-disable no-underscore-dangle */
const _getOutputPath = ({ cwd = process.cwd(), dir = "out" } = {}) =>
  path.join(cwd, dir);

const BABEL_POLYFILL_PATH =
  "./node_modules/react-build/config/babel/babel_polyfill.js";

const extendWebpack = ({
  script,
  argv = {},
  paths: pathsSource,
  getOutputPath = _getOutputPath,
  webpackConfig: webpackConfigSource
}) => {
  const paths = cloneDeep(pathsSource);
  const webpackConfigDefaults = { entry: [], output: {}, externals: {} };
  const webpackConfig = merge({}, webpackConfigDefaults, cloneDeep(webpackConfigSource)); // prettier-ignore
  // CRA does not provide a "development" build,
  // so we map their "build" command,
  // which builds an optimized production build,
  // to an unoptimized development build.
  if (DEVELOPMENT_BUILD_SCRIPTS.includes(script)) {
    webpackConfig.mode = "development";
    webpackConfig.devtool = "eval-source-map";
  }

  if (APP_BUILD_SCRIPTS.includes(script)) {
    paths.appBuild = getOutputPath();
    webpackConfig.output.path = getOutputPath();
    webpackConfig.entry.unshift(BABEL_POLYFILL_PATH);
  }

  // Probably not needed anymore as we can delegate
  // this to `nwb` or similar packages.
  if (PACKAGE_BUILD_SCRIPTS.includes(script)) {
    webpackConfig.output.path = getOutputPath({ dir: "dist" });
    webpackConfig.output.library = getLibraryName({ name: argv.name });
    webpackConfig.output.libraryTarget = "umd";
    webpackConfig.externals["react"] = "react";
    webpackConfig.externals["react-dom"] = "react-dom";
    webpackConfig.externals["styled-components"] = "styled-components";
  }

  return { extendedWebpackConfig: webpackConfig, extendedPaths: paths };
};

const getCssLoaderOptions = () => ({
  modules: {
    localIdentName: "kn-[name]__[local]___[hash:base64:5]"
  }
});

const extendCssLoaderOptions = (cssLoaderOptionsSource = {}) => {
  const cssLoaderOptions = cloneDeep(cssLoaderOptionsSource);
  merge(cssLoaderOptions, getCssLoaderOptions());
  return cssLoaderOptions;
};

module.exports = {
  extendWebpack,
  getCssLoaderOptions,
  extendCssLoaderOptions,
  getOutputPath: _getOutputPath
};
