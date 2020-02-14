const chalk = require("chalk");
const figlet = require("figlet");
const gradient = require("gradient-string");
const { pascalCase } = require("pascal-case");

const _package = require("../package.json");
const { CracoArgs } = require("./args.class");
const { SCRIPTS, SCRIPT_LIST } = require("./scripts");

const REPOSITORY_URL = _package.repository.url;
const ISSUES_URL = `${REPOSITORY_URL}/issues`;

const getLibraryName = ({ name }) => pascalCase(name);

const preflight = ({ script, logger = console }) => {
  /* eslint-disable no-console */
  if (!SCRIPT_LIST.includes(script)) {
    logger.error(
      chalk.red(
        `Invalid action - "${script}". Please provide a valid action (e.g. "start", "build" or "test"). See docs: ${REPOSITORY_URL}.`
      )
    );
    return false;
  }
  if (script === SCRIPTS.EJECT) {
    logger.error(
      chalk.red(
        `Eject is not allowed. If you require assistance, please open an issue: ${ISSUES_URL}.`
      )
    );
    return false;
  }
  if (script === SCRIPTS.BUILD) {
    logger.log(
      chalk.yellow(
        `Creating an unoptimized development build (ignore next line message)...`
      )
    );
  }
  return true;
};

const normalizeScript = ({ rawScript }) => {
  switch (rawScript) {
    // Notice `SCRIPTS.BUILD` is defined
    // for explicit-sake only, as it can
    // be handled by the default case.
    case SCRIPTS.BUILD:
    case SCRIPTS.BUILD_PRODUCTION:
    case SCRIPTS.BUILD_PACKAGE:
    case SCRIPTS.BUILD_PACKAGE_PRODUCTION:
      return new CracoArgs(["build"]).add();
    case SCRIPTS.BUILD_STATS:
      return [
        "./node_modules/source-map-explorer/dist/cli.js",
        "out/static/js/*.js"
      ];
    case SCRIPTS.TEST:
    case SCRIPTS.TEST_WATCH:
      return new CracoArgs(["test"]).add();
    case SCRIPTS.TEST_UPDATE:
      return new CracoArgs(["test", "--updateSnapshot"]).add();
    case SCRIPTS.TEST_PRODUCTION:
      return new CracoArgs(["test", "--ci", "--collectCoverage"]).add();
    case SCRIPTS.EJECT:
      return "eject";
    default:
      return new CracoArgs(rawScript).add();
  }
};

// https://www.rapidtables.com/code/text/ascii/ascii-space.html
const logSignature = () =>
  /* eslint-disable no-console */
  console.log(
    gradient.mind(
      figlet.textSync("\x20kenshoo", {
        font: "Slant",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );

module.exports = {
  preflight,
  logSignature,
  getLibraryName,
  normalizeScript
};
