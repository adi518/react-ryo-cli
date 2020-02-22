const path = require("path");
const minimist = require("minimist");

const { logger, shouldReplaceProductionBuildMessage } = require("./helpers");
const { resolveConfigFilePath, resolveAllowedFilesPath } = require("./resolve");

const preflight = require("./preflight");
const spawnChild = require("./spawn_child");
const logSignature = require("./log_signature");
const { getCracoScript } = require("./get_craco_script");
const { DEVELOPMENT_BUILD_MESSAGE } = require("./constants");

const spawnCli = async () => {
  const [, bin, ...restArgv] = process.argv;
  const [script, ...restArgs] = minimist(restArgv)._;

  try {
    preflight(script);
  } catch (err) {
    logger.error(err);
    process.exit();
  }

  // map our script to a `react-scripts` script,
  // e.g.: `test:production` will be mapped to `test`,
  // and a coverage flag will be set to `true` for adding
  // a coverage report in production build.
  const cracoScript = getCracoScript(script);
  const args = [...cracoScript, ...restArgs];

  const dirname = path.dirname(bin);
  const configPath = resolveConfigFilePath(dirname);
  const allowedFilesPath = resolveAllowedFilesPath(dirname);

  const onData = data => {
    const message = data.toString();
    shouldReplaceProductionBuildMessage(script, message)
      ? logger.warn(DEVELOPMENT_BUILD_MESSAGE)
      : logger.log(message);
  };
  const onError = logger.error;
  const onClose = code => {
    if (code !== 0) logger.log(code);
    !restArgs.inspect && logSignature();
  };

  // https://stackoverflow.com/a/14231570/4106263
  const child = spawnChild("node", args, {
    env: {
      ...process.env,
      // we need a reference to parent `argv`
      // to be able to access trailing arguments.
      PARENT_ARGV: JSON.stringify(process.argv),
      // use `FORCE_COLOR` to retain child output colors.
      // https://stackoverflow.com/a/42839682/4106263
      FORCE_COLOR: true,
      CLI_DIRNAME: dirname,
      CONFIG_PATH: configPath,
      ALLOWED_FILES_PATH: allowedFilesPath,
      REACT_RYO_CLI_CONFIG_PATH: configPath,
      REACT_RYO_CLI_CONSUMER_DIRNAME: dirname,
      REACT_RYO_CLI_ALLOWED_FILES_PATH: allowedFilesPath
    },
    onData,
    onError,
    onClose
  });

  return child;
};

module.exports = { spawnCli };
