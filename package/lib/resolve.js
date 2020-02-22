const {
  CRACO_CONFIG_FILENAME,
  ALLOWED_FILES_FILENAME,
  DEFAULT_CRACO_CONFIG_FILENAME
} = require("./constants");

const { logger, resolveFilePath } = require("./helpers");

const resolveConfigFilePath = dirname => {
  const onExist = filename => logger.success(`✅, Found ${filename}.`);
  const cwd = process.cwd();
  let filePath = resolveFilePath(cwd, CRACO_CONFIG_FILENAME, { onExist });
  if (filePath) return filePath;
  filePath = resolveFilePath(dirname, CRACO_CONFIG_FILENAME, { onExist });
  if (filePath) return filePath;
  filePath = resolveFilePath(cwd, DEFAULT_CRACO_CONFIG_FILENAME);
  if (filePath) return filePath;
  return null;
};

const resolveAllowedFilesPath = dirname => {
  const onExist = filename => logger.success(`✅, Found ${filename}.`);
  const cwd = process.cwd();
  let filePath = resolveFilePath(cwd, ALLOWED_FILES_FILENAME, { onExist });
  if (filePath) return filePath;
  filePath = resolveFilePath(dirname, ALLOWED_FILES_FILENAME, { onExist });
  if (filePath) return filePath;
  return null;
};

module.exports = { resolveConfigFilePath, resolveAllowedFilesPath };
