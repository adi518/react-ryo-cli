// https://github.com/facebook/create-react-app/issues/7227
// https://gist.github.com/adi518/048056495daf508b0253da4ac5ddc921
// https://github.com/styled-components/jest-styled-components#global-installation
// https://github.com/kenshoo/react-core/blob/d5cfb38e334d2bf07ad27be49d68f4b3a76f65b4/.storybook/webpack.config.js

const path = require("path");

const { getArgv, getScriptArg, safeRequireOr } = require("../../lib/helpers");
const {
  resolveAllowedFilesPath,
  resolveCracoConfigFilePath
} = require("../../lib/resolve");

const cliOptionsJSON = process.env.REACT_RYO_CLI_OPTIONS;
const consumerPath = process.env.REACT_RYO_CLI_CONSUMER_PATH;
const endConsumerPath = process.env.REACT_RYO_CLI_END_CONSUMER_PATH; // eslint-disable-line

const cliOptions = JSON.parse(cliOptionsJSON);
const allowedFilesPath = resolveAllowedFilesPath(consumerPath);
const consumerConfigPath = resolveCracoConfigFilePath(consumerPath);

const argv = getArgv();
const script = getScriptArg(argv);
const cwdConfig = safeRequireOr(consumerConfigPath, {});
const allowedFiles = safeRequireOr(allowedFilesPath, []);
const allowedFilesDirname = allowedFilesPath && path.dirname(allowedFilesPath);

const { getDefaultCracoConfig } = require("./craco.default.config");

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
