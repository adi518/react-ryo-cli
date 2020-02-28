const spawnCli = require("./helpers/spawn_cli");

const {
  deepMerge,
  getScriptArg,
  getParentArgv,
  getCliOptions
} = require("./helpers");

const {
  getEnvVars,
  getEnvironmentVariables
} = require("./helpers/get_env_vars");

const {
  SCRIPTS,
  TEST_SCRIPTS,
  BUILD_SCRIPTS,
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS
} = require("./constants");

const isStart = script => SCRIPTS.START === script;
const isTest = script => TEST_SCRIPTS.includes(script);
const isBuild = script => BUILD_SCRIPTS.includes(script);
const isAppBuild = script => APP_BUILD_SCRIPTS.includes(script);
const isPackageBuild = script => PACKAGE_BUILD_SCRIPTS.includes(script);

module.exports = {
  spawnCli,
  isTest,
  isStart,
  isBuild,
  isAppBuild,
  isPackageBuild,
  getCliOptions,
  deepMerge,
  getEnvVars,
  getScriptArg,
  getParentArgv,
  getEnvironmentVariables
};
