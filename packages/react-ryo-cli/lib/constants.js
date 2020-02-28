const path = require("path");

const {
  SCRIPTS,
  SCRIPT_LIST,
  TEST_SCRIPTS,
  BUILD_SCRIPTS,
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
} = require("./constants.scripts");

const PACKAGE_MANAGERS = { NPM: "npm", YARN: "yarn" };

const DEFAULT_BUILD_DIRNAME = "build";
const PACKAGE_JSON = "package.json";
const ALLOWED_FILES_FILENAME = "allowed-files.json";
const REACT_RYO_CLI_ENV_VAR_PREFIX = "REACT_RYO_CLI_";

const REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE =
  "Creating an optimized production build...";
const DEVELOPMENT_BUILD_MESSAGE =
  "Creating an unoptimized development build...";

const CRACO_BIN_PATH = require.resolve("@craco/craco/bin/craco.js");
const CRACO_CONFIG_FILENAME = "craco.config.js";
const CRACO_CONFIG_PATH = path.resolve(
  __dirname,
  "../config/craco",
  CRACO_CONFIG_FILENAME
);

module.exports = {
  CRACO_CONFIG_FILENAME,
  CRACO_CONFIG_PATH,
  CRACO_BIN_PATH,
  PACKAGE_JSON,
  PACKAGE_MANAGERS,
  DEFAULT_BUILD_DIRNAME,
  DEVELOPMENT_BUILD_MESSAGE,
  REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE,
  REACT_RYO_CLI_ENV_VAR_PREFIX,
  ALLOWED_FILES_FILENAME,
  SCRIPTS,
  SCRIPT_LIST,
  TEST_SCRIPTS,
  BUILD_SCRIPTS,
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
};
