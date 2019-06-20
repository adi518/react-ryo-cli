const chalk = require("chalk");
const SCRIPTS = require("./scripts");
const pjson = require("../package.json");

const CRACO_BIN_PATH = "./node_modules/@craco/craco/bin/craco.js";
const CRACO_CONFIG_PATH = "./node_modules/react-build/config/craco/craco.config.js"; // prettier-ignore
const REPOSITORY_URL = pjson.repository.url;
const ISSUES_URL = `${REPOSITORY_URL}/issues`;

const preflight = ({ script }) => {
  /* eslint-disable no-console */
  if (!Object.values(SCRIPTS).includes(script)) {
    console.error(
      chalk.red(
        `Invalid action - "${script}". Please provide a valid action (e.g. "start", "build" or "test"). See docs: ${REPOSITORY_URL}.`
      )
    );
    return false;
  }
  if (script === SCRIPTS.EJECT) {
    console.error(
      chalk.red(
        `Eject is not allowed. If you require assistance, please open an issue: ${ISSUES_URL}.`
      )
    );
    return false;
  }
  if (script === SCRIPTS.BUILD) {
    console.log(
      chalk.yellow(`Creating a development build (ignore next line message)...`)
    );
  }
  return true;
};

class Args {
  constructor(args) {
    this.args = [].concat(args);
  }

  appendCracoConfig() {
    return this.args.concat(["--config", CRACO_CONFIG_PATH]);
  }

  prependCracoBin() {
    return [CRACO_BIN_PATH].concat(this.args);
  }

  addCraco() {
    const cracoBin = this.prependCracoBin();
    const cracoConfig = this.appendCracoConfig();
    return [...new Set(cracoBin.concat(cracoConfig))];
  }
}

const normalizeScript = ({ rawScript }) => {
  switch (rawScript) {
    // Notice `SCRIPTS.BUILD` is defined
    // for explicitness sake only, as it can
    // be handled by the default case.
    case SCRIPTS.BUILD:
    case SCRIPTS.BUILD_PACKAGE:
    case SCRIPTS.BUILD_PRODUCTION:
    case SCRIPTS.BUILD_PACKAGE_PRODUCTION:
      return new Args(["build"]).addCraco();
    case SCRIPTS.BUILD_STATS:
      return [
        "./node_modules/source-map-explorer/dist/cli.js",
        "out/static/js/*.js"
      ];
    case SCRIPTS.TEST:
    case SCRIPTS.TEST_WATCH:
      return new Args(["test"]).addCraco();
    case SCRIPTS.TEST_UPDATE:
      return new Args(["test", "--updateSnapshot"]).addCraco();
    case SCRIPTS.TEST_PRODUCTION:
      return new Args(["test", "--watchAll=false"]).addCraco();
    case SCRIPTS.EJECT:
      return "eject";
    default:
      return new Args(rawScript).addCraco();
  }
};

module.exports = { preflight, normalizeScript, Args };
