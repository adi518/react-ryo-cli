const path = require("path");

const { logger } = require("../logger");
const pkg = require("../../package.json");
const preflight = require("../preflight");
const spawnChild = require("./spawn_child");
const { getCracoScript } = require("./get_craco_script");
const { logSignature, getSignature } = require("../signature");
const { shouldReplaceProductionBuildMessage } = require("../helpers");

const {
  DEFAULT_BUILD_DIRNAME,
  DEVELOPMENT_BUILD_MESSAGE
} = require("../constants");

const spawnCli = ({
  signatureTheme,
  signatureGradient,
  signature: signatureOption = pkg.name,
  verbose = false,
  noExtend = false,
  withEnzyme = true,
  noOverride = false,
  withSignature = true,
  withBabelPolyfill = false,
  withStyledComponents = true,
  outputPath = DEFAULT_BUILD_DIRNAME
} = {}) => {
  const [, binary, ...args] = process.argv;
  const [script, ...restArgs] = args;

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

  // https://stackoverflow.com/a/14231570/4106263
  const child = spawnChild("node", [...cracoScript, ...restArgs], {
    env: {
      ...process.env,
      // use `FORCE_COLOR` to preserve child
      // process output colors.
      // https://stackoverflow.com/a/42839682/4106263
      FORCE_COLOR: true,
      // we need a reference to parent `argv`
      // to be able to access trailing arguments.
      // https://stackoverflow.com/questions/50454341/why-json-stringifyproduction
      REACT_RYO_CLI_PARENT_ARGV: JSON.stringify(process.argv),
      // quick paths reference, consumer to product:
      // `process.cwd()` = end consumer (`docs`)
      // `path.dirname(binary)` = consumer (`react-scripts-custom`)
      // `path.resolve(__dirname, ${filename})` = cli (`react-ryo-cli`)
      REACT_RYO_CLI_CONSUMER_PATH: path.dirname(binary),
      REACT_RYO_CLI_END_CONSUMER_PATH: process.cwd(),
      REACT_RYO_CLI_SCRIPT: script,
      REACT_RYO_CLI_OPTIONS: JSON.stringify({
        verbose,
        noExtend,
        noOverride,
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
        const signature = getSignature(signatureOption);
        logSignature(signature, {
          theme: signatureTheme,
          gradient: signatureGradient
        });
      }
    }
  });

  return child;
};

module.exports = spawnCli;
