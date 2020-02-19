const path = require("path");
const { merge, cloneDeep } = require("lodash");

const {
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
} = require("react-ryo-cli");
const { getLibraryName } = require("react-ryo-cli");

/* eslint-disable no-underscore-dangle */
const getDefaultOutputPath = ({ cwd = process.cwd(), dir = "build" } = {}) =>
  path.join(cwd, dir);

const BABEL_POLYFILL_PATH = path.join(
  __dirname,
  "..",
  "babel/babel_polyfill.js"
);

const extendWebpackConfig = ({
  script,
  argv = {},
  paths: pathsSource,
  webpackConfig: webpackConfigSource,
  getOutputPath = getDefaultOutputPath
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
    const outputPath = getOutputPath();
    paths.appBuild = outputPath;
    webpackConfig.output.path = outputPath;
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

module.exports = {
  extendWebpackConfig,
  getOutputPath: getDefaultOutputPath
};
