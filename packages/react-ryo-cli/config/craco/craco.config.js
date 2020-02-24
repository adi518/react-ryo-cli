const path = require("path");

const { getArgv, getScriptArg, safeRequireOr } = require("../../lib/helpers");

const argv = getArgv();
const script = getScriptArg(argv);
const cwdConfig = safeRequireOr(process.env.CONFIG_PATH, {});
const allowedFiles = safeRequireOr(process.env.ALLOWED_FILES_PATH, []);
const allowedFilesDirname =
  process.env.ALLOWED_FILES_PATH &&
  path.dirname(process.env.ALLOWED_FILES_PATH);

const { getDefaultCracoConfig } = require("./default-craco.config");

const cliOptions = JSON.parse(process.env.REACT_RYO_CLI_OPTIONS);

const getCracoConfig = () => {
  if (cliOptions.noExtend) return cwdConfig;
  const cracoConfig = getDefaultCracoConfig(script, {
    argv,
    cwdConfig,
    cliOptions,
    allowedFiles,
    allowedFilesDirname
  });
  return cracoConfig;
};

const cracoConfig = getCracoConfig();

module.exports = cracoConfig;
