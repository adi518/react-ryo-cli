const path = require("path");
const { merge, cloneDeep } = require("lodash");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const {
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
} = require("../../lib/constants");
const { BUILD_DIR } = require("../../lib/constants");
const { resolveCwd, getLibraryName } = require("../../lib/helpers");

/* eslint-disable no-underscore-dangle */
const getDefaultOutputPath = (dir = BUILD_DIR) => resolveCwd(dir);

const BABEL_POLYFILL_PATH = path.join(
  __dirname,
  "..",
  "babel/babel_polyfill.js"
);

const overrideWebpackConfig = ({
  argv,
  script,
  cliOptions,
  pathsSource,
  allowedFiles,
  webpackConfigSource,
  allowedFilesDirname,
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
    const outputPath = getOutputPath(cliOptions.outputPath);
    paths.appBuild = outputPath;
    webpackConfig.output.path = outputPath;
    if (cliOptions.withBabelPolyfill) {
      webpackConfig.entry.unshift(BABEL_POLYFILL_PATH);
    }
  }

  // probably not needed anymore as we can delegate
  // this to `nwb` or similar packages.
  if (PACKAGE_BUILD_SCRIPTS.includes(script)) {
    webpackConfig.output.path = getOutputPath({ dir: "dist" });
    webpackConfig.output.library = getLibraryName({ name: argv.name });
    webpackConfig.output.libraryTarget = "umd";
    webpackConfig.externals["react"] = "react";
    webpackConfig.externals["react-dom"] = "react-dom";
    webpackConfig.externals["styled-components"] = "styled-components";
  }

  // https://stackoverflow.com/q/44114436/4106263
  // https://stackoverflow.com/a/58321458/4106263
  webpackConfig.resolve.plugins.forEach(plugin => {
    if (plugin instanceof ModuleScopePlugin) {
      allowedFiles.forEach(filePath =>
        plugin.allowedFiles.add(path.join(allowedFilesDirname, filePath))
      );
    }
  });

  return { webpackConfig, paths };
};

module.exports = {
  overrideWebpackConfig,
  getOutputPath: getDefaultOutputPath
};
