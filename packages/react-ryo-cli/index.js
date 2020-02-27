// Yalc provides a better solution than `yarn link` to develop locally:
// https://github.com/whitecolor/yalc
// https://www.viget.com/articles/how-to-use-local-unpublished-node-packages-as-project-dependencies/

const { spawnCli } = require("./lib/spawn");
const {
  deepMerge,
  getScript,
  getParentArgv,
  getLibraryName
} = require("./lib/helpers");
const {
  SCRIPTS,
  BUILD_SCRIPTS,
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
} = require("./lib/scripts");

module.exports = {
  getLibraryName,
  getParentArgv,
  deepMerge,
  spawnCli,
  SCRIPTS,
  getScript,
  BUILD_SCRIPTS,
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
};
