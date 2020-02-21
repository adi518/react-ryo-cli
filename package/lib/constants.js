const path = require("path");

const REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE =
  "Creating an optimized production build...";
const DEVELOPMENT_BUILD_MESSAGE =
  "Creating an unoptimized development build...";

const CRACO_CONFIG_FILENAME = "craco.config.js";
const ALLOWED_FILES_FILENAME = "allowed-files.json";
const CRACO_BIN_PATH = "./node_modules/@craco/craco/bin/craco.js";
const DEFAULT_CRACO_CONFIG_FILENAME = `default-${CRACO_CONFIG_FILENAME}`;
const DEFAULT_CRACO_CONFIG_PATH = path.join(
  __dirname,
  "../config/craco",
  DEFAULT_CRACO_CONFIG_FILENAME
);

const BUILD_DIRNAME = "build";

module.exports = {
  BUILD_DIRNAME,
  CRACO_BIN_PATH,
  CRACO_CONFIG_FILENAME,
  ALLOWED_FILES_FILENAME,
  DEVELOPMENT_BUILD_MESSAGE,
  DEFAULT_CRACO_CONFIG_PATH,
  REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE
};
