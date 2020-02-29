const path = require("path");
const { merge, cloneDeep } = require("lodash");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const { resolveCwd, getLibraryName } = require("../../lib/helpers");

const {
  APP_BUILD_SCRIPTS,
  DEFAULT_OUTPUT_PATH,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
} = require("../../lib/constants");

const getDefaultOutputPath = (dir = DEFAULT_OUTPUT_PATH, options) =>
  resolveCwd(dir, options);

const BABEL_POLYFILL_PATH = path.join(
  __dirname,
  "..",
  "babel/babel_polyfill.js"
);

// we mutate `paths`, which a necessary side-effect.
// https://github.com/gsoft-inc/craco/issues/93
const overrideWebpackConfig = (
  source,
  {
    argv,
    paths,
    script,
    cliOptions,
    allowedFiles,
    allowedFilesDirname,
    getOutputPath = getDefaultOutputPath
  }
) => {
  const defaults = { entry: [], output: {}, externals: {} };
  const config = merge({}, defaults, cloneDeep(source)); // prettier-ignore
  // CRA does not provide a "development" build,
  // so we map their "build" command,
  // which builds an optimized production build,
  // to an unoptimized development build.
  if (DEVELOPMENT_BUILD_SCRIPTS.includes(script)) {
    config.mode = "development";
    config.devtool = "eval-source-map";
  }

  if (APP_BUILD_SCRIPTS.includes(script)) {
    const outputPath = getOutputPath(cliOptions.outputPath);
    paths.appBuild = outputPath;
    config.output.path = outputPath;
    if (cliOptions.withBabelPolyfill) {
      config.entry.unshift(BABEL_POLYFILL_PATH);
    }
  }

  // probably not needed anymore as we can delegate
  // this to `nwb` or similar packages.
  if (PACKAGE_BUILD_SCRIPTS.includes(script)) {
    config.output.path = getOutputPath({ dir: "dist" });
    config.output.library = getLibraryName({ name: argv.name });
    config.output.libraryTarget = "umd";
    config.externals["react"] = "react";
    config.externals["react-dom"] = "react-dom";
    config.externals["styled-components"] = "styled-components";
  }

  // https://stackoverflow.com/q/44114436/4106263
  // https://stackoverflow.com/a/58321458/4106263
  config.resolve.plugins.forEach(plugin => {
    if (plugin instanceof ModuleScopePlugin) {
      allowedFiles.forEach(filePath =>
        plugin.allowedFiles.add(path.join(allowedFilesDirname, filePath))
      );
    }
  });

  return config;
};

module.exports = {
  overrideWebpackConfig,
  getOutputPath: getDefaultOutputPath
};
