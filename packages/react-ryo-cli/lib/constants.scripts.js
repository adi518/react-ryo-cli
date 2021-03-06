// `build:production` is an alias of `build`.

const SCRIPTS = {
  START: "start",
  BUILD: "build",
  BUILD_STATS: "build:stats",
  BUILD_PACKAGE: "build:package",
  BUILD_DEVELOPMENT: "build:development",
  BUILD_PACKAGE_DEVELOPMENT: "build:package:development",
  TEST: "test",
  TEST_WATCH: "test:watch",
  TEST_UPDATE: "test:update",
  TEST_PRODUCTION: "test:production",
  EJECT: "eject"
};

const SCRIPT_LIST = Object.values(SCRIPTS);

const BUILD_SCRIPTS = [
  SCRIPTS.BUILD,
  SCRIPTS.BUILD_STATS,
  SCRIPTS.BUILD_PACKAGE,
  SCRIPTS.BUILD_DEVELOPMENT,
  SCRIPTS.BUILD_PACKAGE_DEVELOPMENT
];

const DEVELOPMENT_BUILD_SCRIPTS = [
  SCRIPTS.BUILD_DEVELOPMENT,
  SCRIPTS.BUILD_PACKAGE_DEVELOPMENT
];

const APP_BUILD_SCRIPTS = [SCRIPTS.BUILD, SCRIPTS.BUILD_DEVELOPMENT];

const PACKAGE_BUILD_SCRIPTS = [
  SCRIPTS.BUILD_PACKAGE,
  SCRIPTS.BUILD_PACKAGE_DEVELOPMENT
];

const TEST_SCRIPTS = [
  SCRIPTS.TEST,
  SCRIPTS.TEST_WATCH,
  SCRIPTS.TEST_UPDATE,
  SCRIPTS.TEST_PRODUCTION
];

module.exports = {
  SCRIPTS,
  SCRIPT_LIST,
  TEST_SCRIPTS,
  BUILD_SCRIPTS,
  APP_BUILD_SCRIPTS,
  PACKAGE_BUILD_SCRIPTS,
  DEVELOPMENT_BUILD_SCRIPTS
};
