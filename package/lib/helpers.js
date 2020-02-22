const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const minimist = require("minimist");
const { merge } = require("lodash/fp");
const { pascalCase } = require("pascal-case");

const { SCRIPTS, BUILD_SCRIPTS } = require("./scripts");
const {
  CRACO_BIN_PATH,
  DEFAULT_CRACO_CONFIG_PATH,
  REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE
} = require("./constants");

const resolve = filePath => path.join(__dirname, filePath);

const resolveCwd = filePath => path.join(process.cwd(), filePath);

const safeRequire = (modulePath, fallback) =>
  modulePath ? require(modulePath) : fallback;

const getArgv = (argv = process.argv) => minimist(argv.slice(2));

const getParentArgv = () =>
  minimist(JSON.parse(process.env.PARENT_ARGV).slice(2));

const getScriptArg = (argv = getArgv()) => argv._[0];

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

const resolveFilePath = (
  dirname,
  filename,
  { onExist = () => {}, onMiss = () => {} } = {}
) => {
  const filePath = path.join(dirname, filename);
  try {
    if (fs.existsSync(filePath)) {
      onExist(filename);
      return filePath;
    }
  } catch (err) {
    onMiss(filename);
    if (err) logger.error(err);
    return null;
  }
};

const shouldReplaceProductionBuildMessage = (script, message) =>
  script === SCRIPTS.BUILD_DEVELOPMENT &&
  message.includes(REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE);

const getDeferredPromise = () => {
  const deferred = {};
  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return { ...deferred, promise };
};

const mergeDeep = () =>
  merge({}, arguments, (objValue, srcValue) =>
    Array.isArray(objValue) ? objValue.concat(srcValue) : undefined
  );

const logger = {
  log: (...args) => console.error(chalk.white(args)),
  success: (...args) => console.error(chalk.green(args)),
  warn: (...args) => console.error(chalk.yellow(args)),
  error: (...args) => console.error(chalk.red(args))
};

const silentLogger = { log: () => {}, error: () => {} };

module.exports = {
  logger,
  resolve,
  getArgv,
  mergeDeep,
  resolveCwd,
  safeRequire,
  getScriptArg,
  silentLogger,
  isBuildScript,
  getParentArgv,
  getLibraryName,
  resolveFilePath,
  getDeferredPromise,
  getCracoCliCommandCreator,
  shouldReplaceProductionBuildMessage
};
