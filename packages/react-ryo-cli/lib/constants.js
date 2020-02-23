const path = require("path");

const BUILD_DIRNAME = "build";
const PACKAGE_JSON = "package.json";
const ALLOWED_FILES_FILENAME = "allowed-files.json";

const REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE =
  "Creating an optimized production build...";
const DEVELOPMENT_BUILD_MESSAGE =
  "Creating an unoptimized development build...";

const CRACO_BIN_PATH = require.resolve("@craco/craco/bin/craco.js");
const CRACO_CONFIG_FILENAME = "craco.config.js";
const DEFAULT_CRACO_CONFIG_FILENAME = `default-${CRACO_CONFIG_FILENAME}`;
const DEFAULT_CRACO_CONFIG_PATH = path.resolve(
  __dirname,
  "../config/craco",
  DEFAULT_CRACO_CONFIG_FILENAME
);

module.exports = {
  PACKAGE_JSON,
  BUILD_DIRNAME,
  CRACO_BIN_PATH,
  CRACO_CONFIG_FILENAME,
  ALLOWED_FILES_FILENAME,
  DEVELOPMENT_BUILD_MESSAGE,
  DEFAULT_CRACO_CONFIG_PATH,
  DEFAULT_CRACO_CONFIG_FILENAME,
  REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE
};
