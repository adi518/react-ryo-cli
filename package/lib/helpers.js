const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { merge } = require("lodash");
const minimist = require("minimist");
const { pascalCase } = require("pascal-case");

const preflight = require("./preflight");
const { SCRIPTS, BUILD_SCRIPTS } = require("./scripts");
const {
  CRACO_BIN_PATH,
  CRACO_CONFIG_FILENAME,
  ALLOWED_FILES_FILENAME,
  DEFAULT_CRACO_CONFIG_PATH,
  DEFAULT_CRACO_CONFIG_FILENAME,
  REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE
} = require("./constants");

const resolve = filePath => path.join(__dirname, filePath);

const safeRequire = (modulePath, fallback) =>
  modulePath ? require(modulePath) : fallback;

const getArgv = (argv = process.argv) => minimist(argv.slice(2));

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
    suffixArgs: ["--config", configPath || DEFAULT_CRACO_CONFIG_PATH]
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
  let filePath = getFilePath(process.cwd(), CRACO_CONFIG_FILENAME, {
    onExist: () =>
      console.log(chalk.green(`✅, Found ${CRACO_CONFIG_FILENAME}.`))
  });
  if (filePath) return filePath;
  filePath = getFilePath(dirname, CRACO_CONFIG_FILENAME, {
    onExist: () =>
      console.log(chalk.green(`✅, Found ${CRACO_CONFIG_FILENAME}.`))
  });
  if (filePath) return filePath;
  filePath = getFilePath(process.cwd(), DEFAULT_CRACO_CONFIG_FILENAME, {
    onExist: () =>
      console.log(
        chalk.green(`⚠️, Falling back to ${DEFAULT_CRACO_CONFIG_FILENAME}.`)
      )
  });
  if (filePath) return filePath;
  return null;
};

const resolveAllowedFilesPath = dirname => {
  const onExist = () =>
    console.log(chalk.green(`✅, Found ${ALLOWED_FILES_FILENAME}.`));
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

const shouldReplaceProductionBuildMessage = (script, message) =>
  script === SCRIPTS.BUILD_DEVELOPMENT &&
  message.includes(REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE);

const silentLogger = { log: () => {}, error: () => {} };

module.exports = {
  resolve,
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
  getCracoCliCommandCreator,
  shouldReplaceProductionBuildMessage
};
