// `build:production` is an alias of `build`.

const SCRIPTS = {
  START: "start",
  BUILD: "build",
  BUILD_STATS: "build:stats",
  BUILD_PACKAGE: "build:package",
  BUILD_PRODUCTION: "build:production",
  BUILD_PACKAGE_PRODUCTION: "build:package:production",
  TEST: "test",
  TEST_WATCH: "test:watch",
  TEST_UPDATE: "test:update",
  TEST_PRODUCTION: "test:production",
  EJECT: "eject"
};

const BUILD_SCRIPTS = [
  SCRIPTS.BUILD_STATS,
  SCRIPTS.BUILD_PACKAGE,
  SCRIPTS.BUILD_PRODUCTION,
  SCRIPTS.BUILD_PACKAGE_PRODUCTION
];

module.exports = {
  SCRIPTS,
  BUILD_SCRIPTS
};
