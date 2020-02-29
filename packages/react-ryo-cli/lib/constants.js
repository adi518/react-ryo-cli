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

const DEFAULT_OUTPUT_PATH = "build";
const PACKAGE_JSON = "package.json";
const ALLOWED_FILES_FILENAME = "allowed-files.json";
const REACT_RYO_CLI_ENV_VAR_PREFIX = "REACT_RYO_CLI_";

const REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE =
  "Creating an optimized production build...";
const DEVELOPMENT_BUILD_MESSAGE =
  "Creating an unoptimized development build...";
const MISSING_BUGS_URL = `Field "bugs" is missing from package.json, please add it. See https://docs.npmjs.com/files/package.json#bugs.`;

const CRACO_BIN_PATH = require.resolve("@craco/craco/bin/craco.js");
const CRACO_CONFIG_FILENAME = "craco.config.js";
const DEFAULT_CRACO_CONFIG_PATH = path.resolve(
  __dirname,
  "../config/craco",
  CRACO_CONFIG_FILENAME
);

module.exports = {
  DEFAULT_CRACO_CONFIG_PATH,
  CRACO_CONFIG_FILENAME,
  MISSING_BUGS_URL,
  CRACO_BIN_PATH,
  PACKAGE_JSON,
  PACKAGE_MANAGERS,
  DEFAULT_OUTPUT_PATH,
  ALLOWED_FILES_FILENAME,
  DEVELOPMENT_BUILD_MESSAGE,
  REACT_RYO_CLI_ENV_VAR_PREFIX,
  REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE,
  SCRIPTS,
  SCRIPT_LIST,
  TEST_SCRIPTS,
  BUILD_SCRIPTS,
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
};
