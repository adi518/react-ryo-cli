const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { merge } = require("lodash");
const minimist = require("minimist");
const { pascalCase } = require("pascal-case");

const preflight = require("./preflight");
const { BUILD_SCRIPTS } = require("./scripts");

const CRACO_CONFIG_FILENAME = "craco.config.js";
const ALLOWED_FILES_FILENAME = "allowed-files.json";
const CRACO_BIN_PATH = "./node_modules/@craco/craco/bin/craco.js";
const DEFAULT_CRACO_CONFIG_FILENAME = `default-${CRACO_CONFIG_FILENAME}`;
const DEFAULT_CRACO_CONFIG_PATH = path.join(
  __dirname,
  "../config/craco",
  DEFAULT_CRACO_CONFIG_FILENAME
);

const safeRequire = modulePath => modulePath && require(modulePath);

const getArgv = () => minimist(process.argv.slice(2));

const getParentArgv = () =>
  minimist(JSON.parse(process.env.PARENT_ARGV).slice(2));

const getScriptArg = argv => {
  const {
    _: [script]
  } = argv;
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

const getFilePath = (
  dirname,
  filename,
  { onExist = () => {}, onMiss = () => {} } = {}
) => {
  const filePath = path.join(dirname, filename);
  try {
    if (fs.existsSync(filePath)) {
      onExist();
      return filePath;
    }
  } catch (err) {
    onMiss();
    if (err) console.error(err);
    return null;
  }
};

const resolveConfigFilePath = dirname => {
  let filePath = getFilePath(dirname, CRACO_CONFIG_FILENAME, {
    onExist: () => console.warn(chalk.green(`${CRACO_CONFIG_FILENAME} found.`)),
    onMiss: () =>
      console.warn(chalk.yellow(`${CRACO_CONFIG_FILENAME} not found.`))
  });
  if (filePath) return filePath;
  filePath = getFilePath(process.cwd(), DEFAULT_CRACO_CONFIG_FILENAME, {
    onExist: () =>
      console.warn(
        chalk.green(`Falling back to ${DEFAULT_CRACO_CONFIG_FILENAME}.`)
      )
  });
  if (filePath) return filePath;
  return null;
};

const resolveAllowedFilesPath = dirname => {
  const onExist = () =>
    console.warn(chalk.green(`${ALLOWED_FILES_FILENAME} found.`));
  let filePath = getFilePath(dirname, ALLOWED_FILES_FILENAME, { onExist });
  if (filePath) return filePath;
  filePath = getFilePath(process.cwd(), ALLOWED_FILES_FILENAME, { onExist });
  if (filePath) return filePath;
  return null;
};

const mergeDeep = (...sources) => {
  const clone = {};
  merge(clone, ...sources);
  return clone;
};

const silentLogger = { log: () => {}, error: () => {} };

module.exports = {
  getArgv,
  preflight,
  mergeDeep,
  safeRequire,
  getScriptArg,
  silentLogger,
  isBuildScript,
  getParentArgv,
  getLibraryName,
  CRACO_CONFIG_FILENAME,
  resolveConfigFilePath,
  resolveAllowedFilesPath,
  getCracoCliCommandCreator
};
