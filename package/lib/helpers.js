const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const figlet = require("figlet");
const minimist = require("minimist");
const gradient = require("gradient-string");
const { merge } = require("lodash");
const { pascalCase } = require("pascal-case");

const pkg = require("../package.json");
const preflight = require("./preflight");
const { BUILD_SCRIPTS } = require("./scripts");

const CRACO_CONFIG_FILENAME = "craco.config.js";
const DEFAULT_CRACO_CONFIG_FILENAME = "default-craco.config.js";
const CRACO_BIN_PATH = "./node_modules/@craco/craco/bin/craco.js";
const DEFAULT_CRACO_CONFIG_PATH = path.join(
  __dirname,
  "../config/craco",
  DEFAULT_CRACO_CONFIG_FILENAME
);

const getArgv = () => minimist(process.argv.slice(2));

const getParentArgv = () =>
  minimist(JSON.parse(process.env.PARENT_ARGV).slice(2));

const getScript = () => {
  const {
    _: [script]
  } = getParentArgv();
  return script;
};

const getLibraryName = ({ name }) => pascalCase(name);

const isBuildScript = script => BUILD_SCRIPTS.includes(script);

const createCliCommand = ({ args, prefixArgs, suffixArgs }) =>
  [].concat(prefixArgs).concat(args, suffixArgs);

const getCracoCliCommandCreator = configPath => args =>
  createCliCommand({
    args,
    prefixArgs: CRACO_BIN_PATH,
    suffixArgs: [
      "--config",
      configPath ? configPath : DEFAULT_CRACO_CONFIG_PATH
    ]
  });

const getConfigPath = dirname => {
  const configPath = path.join(dirname, CRACO_CONFIG_FILENAME);
  try {
    if (fs.existsSync(configPath)) {
      console.warn(chalk.green("Configuration file found!"));
      return configPath;
    }
  } catch (err) {
    console.warn(chalk.yellow("No configuration file found."));
    if (err) console.error(err);
    return null;
  }
};

const mergeDeep = (...sources) => {
  const clone = {};
  merge(clone, ...sources);
  return clone;
};

// https://www.rapidtables.com/code/text/ascii/ascii-space.html
const logSignature = (
  signature = pkg.name,
  theme,
  color = ["rgb(102, 51, 153)", "rgb(102, 51, 153)"]
) => {
  /* eslint-disable no-console */
  if (theme && !gradient[theme])
    return console.error(
      `No such theme as "${theme}". See https://www.npmjs.com/package/gradient-string#available-built-in-gradients for a list of possible themes.`
    );
  const ascii = figlet.textSync(`\x20${signature}`, {
    font: "Slant",
    horizontalLayout: "default",
    verticalLayout: "default"
  });
  console.log(theme ? gradient[theme](ascii) : gradient(color)(ascii));
};

const silentLogger = { log: () => {}, error: () => {} };

module.exports = {
  getArgv,
  preflight,
  getScript,
  mergeDeep,
  silentLogger,
  logSignature,
  isBuildScript,
  getParentArgv,
  getConfigPath,
  getLibraryName,
  getCracoCliCommandCreator
};
