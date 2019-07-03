const chalk = require("chalk");
const figlet = require("figlet");
const gradient = require("gradient-string");

const pjson = require("../package.json");
const { SCRIPTS, SCRIPT_LIST } = require("./scripts");

const CRACO_BIN_PATH = "./node_modules/@craco/craco/bin/craco.js";
const CRACO_CONFIG_PATH = "./node_modules/react-build/config/craco/craco.config.js"; // prettier-ignore
const NWB_BIN_PATH = "./node_modules/nwb/lib/bin/nwb.js";
const NWB_CONFIG_PATH = "./node_modules/react-build/config/nwb/nwb.config.js"; // prettier-ignore
const REPOSITORY_URL = pjson.repository.url;
const ISSUES_URL = `${REPOSITORY_URL}/issues`;

const getLibraryName = () => {
  const param = process.argv.find(arg => arg.indexOf("name=") !== -1);
  return param ? param.replace("name=", "") : undefined;
};

const preflight = ({ script }) => {
  /* eslint-disable no-console */
  if (!SCRIPT_LIST.includes(script)) {
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
      chalk.yellow(
        `Creating an unoptimized development build (ignore next line message)...`
      )
    );
  }
  return true;
};

class Args {
  constructor(args) {
    this.args = [].concat(args);
  }

  prependCracoBin() {
    return [CRACO_BIN_PATH].concat(this.args);
  }

  appendCracoConfig() {
    return this.args.concat(["--config", CRACO_CONFIG_PATH]);
  }

  addCraco() {
    const cracoBin = this.prependCracoBin();
    const cracoConfig = this.appendCracoConfig();
    return [...new Set(cracoBin.concat(cracoConfig))];
  }

  prependNwbBin() {
    return [NWB_BIN_PATH].concat(this.args);
  }

  appendNwbConfig() {
    return this.args.concat(["--config", NWB_CONFIG_PATH]);
  }

  addNwb() {
    const nwbBin = this.prependNwbBin();
    const nwbConfig = this.appendNwbConfig();
    return [...new Set(nwbBin.concat(nwbConfig))];
  }
}

const normalizeScript = ({ rawScript }) => {
  switch (rawScript) {
    // Notice `SCRIPTS.BUILD` is defined
    // for explicit-sake only, as it can
    // be handled by the default case.
    case SCRIPTS.BUILD:
    case SCRIPTS.BUILD_PRODUCTION:
      return new Args(["build"]).addCraco();
    case SCRIPTS.BUILD_PACKAGE:
    case SCRIPTS.BUILD_PACKAGE_PRODUCTION:
      return new Args("build-react-component").addNwb();
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
      return new Args(["test", "--ci", "--collectCoverage"]).addCraco();
    case SCRIPTS.EJECT:
      return "eject";
    default:
      return new Args(rawScript).addCraco();
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
  Args,
  preflight,
  logSignature,
  getLibraryName,
  normalizeScript
};
