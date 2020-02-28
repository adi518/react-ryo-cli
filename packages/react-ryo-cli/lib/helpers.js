const fs = require("fs");
const path = require("path");
const minimist = require("minimist");
const { mergeWith } = require("lodash/fp");
const { pascalCase } = require("pascal-case");

const { logger } = require("./logger");
const {
  CRACO_BIN_PATH,
  CRACO_CONFIG_PATH,
  REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE
} = require("./constants");

const { SCRIPTS, BUILD_SCRIPTS } = require("./constants");

const resolve = (filePath, dirname = __dirname) =>
  path.resolve(dirname, filePath);

const resolveCwd = filePath => path.resolve(process.cwd(), filePath);

const resolveExists = (
  filePath,
  { onExist = () => {}, onMiss = () => {} } = {}
) => {
  const filename = path.basename(filePath);
  const dirname = path.dirname(filePath);
  try {
    if (fs.existsSync(filePath)) {
      onExist(filePath, filename, dirname);
      return filePath;
    }
  } catch (err) {
    onMiss(filePath, filename, dirname);
    if (err) logger.error(err);
    return null;
  }
};

const safeRequireOr = (modulePath, fallback) =>
  modulePath ? require(modulePath) : fallback;

const getEnv = () => process.env;

const getArgv = (argv = process.argv) => minimist(argv.slice(2));

const getParentArgv = () =>
  minimist(JSON.parse(process.env.REACT_RYO_CLI_PARENT_ARGV).slice(2));

const getCliOptions = () =>
  minimist(JSON.parse(process.env.REACT_RYO_CLI_OPTIONS));

const getScriptArg = (argv = getArgv()) => argv._[0];
// const getScriptArg = () => JSON.parse(process.env.npm_config_argv).original[0];

const getLibraryName = ({ name }) => pascalCase(name);

const isBuildScript = script => BUILD_SCRIPTS.includes(script);

const createCliCommand = ({ script, args, suffixArgs }) =>
  [script].concat(args, suffixArgs);

const getCracoCliCommandCreator = configPath => args =>
  createCliCommand({
    script: CRACO_BIN_PATH,
    args,
    suffixArgs: ["--config", configPath || CRACO_CONFIG_PATH]
  });

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

const deepMerge = (...sources) =>
  mergeWith({}, sources, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });

module.exports = {
  resolve,
  getEnv,
  getArgv,
  deepMerge,
  resolveCwd,
  getCliOptions,
  safeRequireOr,
  getScriptArg,
  resolveExists,
  isBuildScript,
  getParentArgv,
  getLibraryName,
  getDeferredPromise,
  getCracoCliCommandCreator,
  shouldReplaceProductionBuildMessage
};
