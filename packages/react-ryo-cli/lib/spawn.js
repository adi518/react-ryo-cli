const path = require("path");
const minimist = require("minimist");

const { logger } = require("./logger");
const { shouldReplaceProductionBuildMessage } = require("./helpers");

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
  signatureTheme,
  signatureGradient,
  noExtend = false,
  withEnzyme = true,
  withSignature = true,
  withBabelPolyfill = false,
  withStyledComponents = true,
  outputPath = DEFAULT_BUILD_DIRNAME,
  signature: signatureOption = pkg.name
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

  // quick paths reference, consumer to product:
  // `process.cwd()` = end consumer (`docs`)
  // `path.dirname(bin)` = consumer (`react-scripts-custom`)
  // `__dirname` = cli (`react-ryo-cli`)

  // https://stackoverflow.com/a/14231570/4106263
  const child = spawnChild("node", spawnArgs, {
    env: {
      ...process.env,
      // use `FORCE_COLOR` to retain child output colors.
      // https://stackoverflow.com/a/42839682/4106263
      FORCE_COLOR: true,
      // we need a reference to parent `argv`
      // to be able to access trailing arguments.
      // https://stackoverflow.com/questions/50454341/why-json-stringifyproduction
      REACT_RYO_CLI_PARENT_ARGV: JSON.stringify(process.argv),
      REACT_RYO_CLI_CONSUMER_PATH: path.dirname(bin),
      REACT_RYO_CLI_END_CONSUMER_PATH: process.cwd(),
      REACT_RYO_CLI_OPTIONS: JSON.stringify({
        noExtend,
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
        const signature = signatureOption;
        logSignature(signature, {
          theme: signatureTheme,
          gradient: signatureGradient
        });
      }
    }
  });

  return child;
};

module.exports = { spawnCli };
