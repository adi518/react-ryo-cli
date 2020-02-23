const fs = require("fs");
const path = require("path");
const minimist = require("minimist");
const { mergeWith } = require("lodash/fp");
const { pascalCase } = require("pascal-case");

const { logger } = require("./logger");
const { SCRIPTS, BUILD_SCRIPTS } = require("./scripts");
const {
  CRACO_BIN_PATH,
  DEFAULT_CRACO_CONFIG_PATH,
  REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE
} = require("./constants");

const resolve = (filePath, dirname = __dirname) =>
  path.resolve(dirname, filePath);

const resolveCwd = filePath => path.resolve(process.cwd(), filePath);

const resolveExists = (
  filePath,
  { onExist = () => {}, onMiss = () => {} } = {}
) => {
  try {
    if (fs.existsSync(filePath)) {
      onExist(filePath);
      return filePath;
    }
  } catch (err) {
    onMiss(filePath);
    if (err) logger.error(err);
    return null;
  }
};

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

const mergeDeep = sources =>
  mergeWith(...sources, (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });

module.exports = {
  resolve,
  getArgv,
  mergeDeep,
  resolveCwd,
  safeRequire,
  getScriptArg,
  resolveExists,
  isBuildScript,
  getParentArgv,
  getLibraryName,
  getDeferredPromise,
  getCracoCliCommandCreator,
  shouldReplaceProductionBuildMessage
};
