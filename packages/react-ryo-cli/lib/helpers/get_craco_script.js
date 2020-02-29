const { SCRIPTS } = require("../constants");
const { getCracoCliCommandCreator } = require("../helpers");

const getCracoScript = (script, { outputPath } = {}) => {
  const createCracoCliCommand = getCracoCliCommandCreator();
  switch (script) {
    // notice `SCRIPTS.BUILD` is defined
    // for explicit-sake only, as it can
    // be handled by the default case.
    case SCRIPTS.BUILD:
    case SCRIPTS.BUILD_DEVELOPMENT:
    case SCRIPTS.BUILD_PACKAGE:
    case SCRIPTS.BUILD_PACKAGE_PRODUCTION:
      return createCracoCliCommand(SCRIPTS.BUILD);
    case SCRIPTS.BUILD_STATS:
      return [
        require.resolve("source-map-explorer/dist/cli.js"),
        `${outputPath}/static/js/*.js`
      ];
    case SCRIPTS.TEST:
    case SCRIPTS.TEST_WATCH:
      return createCracoCliCommand(SCRIPTS.TEST);
    case SCRIPTS.TEST_UPDATE:
      return createCracoCliCommand([SCRIPTS.TEST, "--updateSnapshot"]);
    case SCRIPTS.TEST_PRODUCTION:
      return createCracoCliCommand([SCRIPTS.TEST, "--ci", "--collectCoverage"]);
    case SCRIPTS.EJECT:
      return [SCRIPTS.EJECT];
    default:
      return createCracoCliCommand(script);
  }
};

module.exports = getCracoScript;
