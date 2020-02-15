const { SCRIPTS } = require("./scripts");
const { getCracoCliCommandCreator } = require("./helpers");

const normalizeScript = ({ rawScript }) => {
  const createCracoCliCommand = getCracoCliCommandCreator();
  switch (rawScript) {
    // Notice `SCRIPTS.BUILD` is defined
    // for explicit-sake only, as it can
    // be handled by the default case.
    case SCRIPTS.BUILD:
    case SCRIPTS.BUILD_PRODUCTION:
    case SCRIPTS.BUILD_PACKAGE:
    case SCRIPTS.BUILD_PACKAGE_PRODUCTION:
      return createCracoCliCommand("build");
    case SCRIPTS.BUILD_STATS:
      return [
        "./node_modules/source-map-explorer/dist/cli.js",
        "out/static/js/*.js"
      ];
    case SCRIPTS.TEST:
    case SCRIPTS.TEST_WATCH:
      return createCracoCliCommand("test");
    case SCRIPTS.TEST_UPDATE:
      return createCracoCliCommand(["test", "--updateSnapshot"]);
    case SCRIPTS.TEST_PRODUCTION:
      return createCracoCliCommand(["test", "--ci", "--collectCoverage"]);
    case SCRIPTS.EJECT:
      return ["eject"];
    default:
      return createCracoCliCommand(rawScript);
  }
};

module.exports = { normalizeScript };
