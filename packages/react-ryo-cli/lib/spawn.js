const path = require("path");
const minimist = require("minimist");

const { logger } = require("./logger");
const { shouldReplaceProductionBuildMessage } = require("./helpers");
const { resolveConfigFilePath, resolveAllowedFilesPath } = require("./resolve");

const pkg = require("../package.json");
const preflight = require("./preflight");
const spawnChild = require("./spawn_child");
const { getCracoScript } = require("./get_craco_script");
const { logSignature, getSignature } = require("./signature");
const {
  DEFAULT_BUILD_DIRNAME,
  DEVELOPMENT_BUILD_MESSAGE
} = require("./constants");

const spawnCli = ({
  signature = pkg.name,
  signatureTheme,
  signatureGradient,
  noExtend = false,
  withEnzyme = true,
  withSignature = true,
  withBabelPolyfill = false,
  withStyledComponents = true,
  outputPath = DEFAULT_BUILD_DIRNAME
} = {}) => {
  const [, bin, ...argv] = process.argv;
  const [script, ...restArgs] = minimist(argv)._;

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
  const cracoScript = getCracoScript(script, { outputPath });
  const spawnArgs = [...cracoScript, ...restArgs];

  // cwd is custom cli consumer (docs), which initiates
  // custom cli dependency binary (react-scripts-custom)
  // which uses the base cli (react-ryo-cli) API.

  console.log(process.cwd());
  process.exit();
  const endConsumerDirname = process.cwd();
  const cliConsumerDirname = path.dirname(bin);
  const configPath = resolveConfigFilePath(cliConsumerDirname);
  const allowedFilesPath = resolveAllowedFilesPath(cliConsumerDirname);

  // https://stackoverflow.com/a/14231570/4106263
  const child = spawnChild("node", spawnArgs, {
    env: {
      ...process.env,
      // we need a reference to parent `argv`
      // to be able to access trailing arguments.
      // https://stackoverflow.com/questions/50454341/why-json-stringifyproduction
      PARENT_ARGV: JSON.stringify(process.argv),
      // use `FORCE_COLOR` to retain child output colors.
      // https://stackoverflow.com/a/42839682/4106263
      FORCE_COLOR: true,
      REACT_RYO_CLI_CONFIG_PATH: configPath,
      REACT_RYO_CLI_CONSUMER_DIRNAME: cliConsumerDirname,
      REACT_RYO_CLI_END_CONSUMER_DIRNAME: endConsumerDirname,
      REACT_RYO_CLI_ALLOWED_FILES_PATH: allowedFilesPath,
      REACT_RYO_CLI_OPTIONS: JSON.stringify({
        noExtend,
        signature,
        outputPath,
        withEnzyme,
        withBabelPolyfill,
        withStyledComponents
      })
    },
    onData: data => {
      const message = data.toString();
      shouldReplaceProductionBuildMessage(script, message)
        ? logger.warn(DEVELOPMENT_BUILD_MESSAGE)
        : logger.log(message);
    },
    onError: logger.error,
    onClose: code => {
      if (code !== 0) logger.log(code);
      if (withSignature && !restArgs.inspect) {
        logSignature(getSignature(signature), {
          theme: signatureTheme,
          gradient: signatureGradient
        });
      }
    }
  });

  return child;
};

module.exports = { spawnCli };
