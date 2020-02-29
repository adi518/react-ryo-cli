const fs = require("fs");
const path = require("path");
const minimist = require("minimist");
const { pascalCase } = require("pascal-case");
const { get, isString, mergeWith } = require("lodash");

const { logger } = require("./logger");
const {
  CRACO_BIN_PATH,
  DEFAULT_CRACO_CONFIG_PATH,
  REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE
} = require("./constants");

const { SCRIPTS, BUILD_SCRIPTS } = require("./constants");

const resolve = (filePath, dirname = __dirname) =>
  path.resolve(dirname, filePath);

const resolveCwd = (filePath, { cwd = process.cwd() } = {}) =>
  path.resolve(cwd, filePath);

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
  [].concat(script, args, suffixArgs);

const getCracoCliCommandCreator = () => args =>
  createCliCommand({
    script: CRACO_BIN_PATH,
    args,
    suffixArgs: ["--config", DEFAULT_CRACO_CONFIG_PATH]
  });

const shouldReplaceProductionBuildMessage = (script, message) =>
  script === SCRIPTS.BUILD_DEVELOPMENT &&
  message.includes(REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE);

const deepMerge = (...sources) =>
  mergeWith({}, ...sources, (objValue, srcValue) =>
    Array.isArray(objValue) ? objValue.concat(srcValue) : undefined
  );

const getBugsUrl = pkg => {
  const bugs = get(pkg, "bugs.url") || get(pkg, "bugs");
  return isString(bugs) ? bugs : null;
};

module.exports = {
  safeRequireOr,
  deepMerge,
  resolve,
  resolveCwd,
  resolveExists,
  isBuildScript,
  getEnv,
  getArgv,
  getBugsUrl,
  getScriptArg,
  getCliOptions,
  getParentArgv,
  getLibraryName,
  getCracoCliCommandCreator,
  shouldReplaceProductionBuildMessage
};
