const { logger } = require("./logger");
const { resolve, resolveCwd, resolveExists } = require("./helpers");

const {
  CRACO_CONFIG_FILENAME,
  ALLOWED_FILES_FILENAME,
  DEFAULT_CRACO_CONFIG_PATH
} = require("./constants");

const onExist = filename => logger.success(`✅, Found ${filename}.`);

const resolvePaths = (paths = []) =>
  paths.map(([filePath, options]) => resolveExists(filePath, options));

// Attempt to grab three file paths:
// Cwd - Consumer configuration file, e.g.: `docs`.
// Cli - Custom Cli configuration file, e.g.: `react-scripts-custom`.
// Default - Default configuration file, e.g.: `react-ryo-cli`.

const resolveConfigFilePath = dirname => {
  const [cracoConfigCwd, cracoConfigDir, defaultCracoConfig] = resolvePaths([
    [resolveCwd(CRACO_CONFIG_FILENAME), { onExist }],
    [resolve(CRACO_CONFIG_FILENAME, dirname), { onExist }],
    [DEFAULT_CRACO_CONFIG_PATH]
  ]);
  if (cracoConfigCwd) return cracoConfigCwd;
  if (cracoConfigDir) return cracoConfigDir;
  if (defaultCracoConfig) return defaultCracoConfig;
  return null;
};

const resolveAllowedFilesPath = () => {
  const [allowedFilesCwd] = resolvePaths([
    [resolveCwd(ALLOWED_FILES_FILENAME), { onExist }]
  ]);
  if (allowedFilesCwd) return allowedFilesCwd;
  return null;
};

module.exports = { resolveConfigFilePath, resolveAllowedFilesPath };
