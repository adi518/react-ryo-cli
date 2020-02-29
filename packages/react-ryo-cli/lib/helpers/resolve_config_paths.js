const { logger } = require("../logger");
const { resolve, resolveCwd, resolveExists } = require("../helpers");

const {
  CRACO_CONFIG_FILENAME,
  ALLOWED_FILES_FILENAME,
  DEFAULT_CRACO_CONFIG_PATH
} = require("../constants");

const onExist = ({ prefix = "", suffix = "." } = {}) => (
  _filePath,
  filename,
  dirname
) => logger.success(`${prefix}📦 Found ${filename} in ${dirname}${suffix}`);

const onExistEnd = onExist({ suffix: " (end configuration)." });
const onExistBase = onExist({ suffix: " (base configuration)." });
const onExistDefault = onExist({ suffix: " (default configuration)." });

const resolvePaths = (paths = []) =>
  paths.map(([filePath, options]) => resolveExists(filePath, options));

// Attempt to grab three file paths:
// Cwd - Consumer configuration file, e.g.: `docs`.
// Cli - Custom Cli configuration file, e.g.: `react-scripts-custom`.
// Default - Default configuration file, e.g.: `react-ryo-cli`.
const resolveCracoConfigFilePath = (cliConsumerPath, args) => {
  const [cracoConfigCwd, cracoConfigDir, defaultCracoConfig] = resolvePaths([
    [resolveCwd(CRACO_CONFIG_FILENAME), { onExist: onExistEnd }],
    [resolve(CRACO_CONFIG_FILENAME, cliConsumerPath), { onExist: onExistBase }],
    [DEFAULT_CRACO_CONFIG_PATH, args.noExtend ? { onExist: onExistDefault } : undefined] // prettier-ignore
  ]);
  if (cracoConfigCwd) return cracoConfigCwd;
  if (cracoConfigDir) return cracoConfigDir;
  if (defaultCracoConfig) return defaultCracoConfig;
  return null;
};

const resolveAllCracoConfigFilePaths = (consumerPath, args) => {
  const [
    endConsumerCracoConfigPath,
    consumerCracoConfigPath,
    defaultCracoConfigPath
  ] = resolvePaths([
    [resolveCwd(CRACO_CONFIG_FILENAME), { onExist: onExistEnd }],
    [resolve(CRACO_CONFIG_FILENAME, consumerPath), { onExist: onExistBase }],
    [DEFAULT_CRACO_CONFIG_PATH, args.noExtend ? undefined : { onExist: onExistDefault }] // prettier-ignore
  ]);
  return {
    endConsumerCracoConfigPath,
    consumerCracoConfigPath,
    defaultCracoConfigPath
  };
};

const resolveAllowedFilesPath = () => {
  const [allowedFilesCwd] = resolvePaths([
    [resolveCwd(ALLOWED_FILES_FILENAME), { onExist: onExist() }]
  ]);
  if (allowedFilesCwd) return allowedFilesCwd;
  return null;
};

module.exports = {
  resolveAllowedFilesPath,
  resolveCracoConfigFilePath,
  resolveAllCracoConfigFilePaths
};
