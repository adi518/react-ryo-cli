const {
  isPackageBuild,
  isAppBuild,
  spawnCli,
  isTest,
  isStart,
  isBuild,
  deepMerge,
  getEnvVars,
  getScriptArg,
  getParentArgv,
  getCliOptions,
  getEnvironmentVariables
} = require("./lib/api");

const {
  SCRIPTS,
  BUILD_SCRIPTS,
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
} = require("./lib/constants");

module.exports = {
  deepMerge,
  spawnCli,
  isTest,
  isStart,
  isBuild,
  isAppBuild,
  isPackageBuild,
  getEnvironmentVariables,
  getEnvVars,
  getScriptArg,
  getParentArgv,
  getCliOptions,
  DEVELOPMENT_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  APP_BUILD_SCRIPTS,
  BUILD_SCRIPTS,
  SCRIPTS
};
