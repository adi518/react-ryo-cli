const figlet = require("figlet");
const gradient = require("gradient-string");
const { pascalCase } = require("pascal-case");

const { resolve } = require("./utils");
const preflight = require("./preflight");
const { SCRIPTS } = require("./scripts");

const CRACO_BIN_PATH = "./node_modules/@craco/craco/bin/craco.js";
const CRACO_CONFIG_PATH = resolve("config/craco/craco.config.js");

const getLibraryName = ({ name }) => pascalCase(name);

const createCliCommand = ({ args, prefixArgs, suffixArgs }) =>
  [].concat(prefixArgs).concat(args, [].concat(suffixArgs));

const createCracoCliCommand = args =>
  createCliCommand({
    args,
    prefixArgs: CRACO_BIN_PATH,
    suffixArgs: ["--config", CRACO_CONFIG_PATH]
  });

const normalizeScript = ({ rawScript }) => {
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
      return "eject";
    default:
      return createCracoCliCommand(rawScript);
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
  normalizeScript,
  createCracoCliCommand
};
