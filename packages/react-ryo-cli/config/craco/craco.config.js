// https://github.com/facebook/create-react-app/issues/7227
// https://gist.github.com/adi518/048056495daf508b0253da4ac5ddc921
// https://github.com/styled-components/jest-styled-components#global-installation
// https://github.com/kenshoo/react-core/blob/d5cfb38e334d2bf07ad27be49d68f4b3a76f65b4/.storybook/webpack.config.js

const path = require("path");

const {
  resolveAllowedFilesPath,
  resolveAllCracoConfigFilePaths
} = require("../../lib/resolve");

const mergeCracoConfig = require("./helpers/merge_craco_config");
const { getDefaultCracoConfig } = require("./craco.default.config");
const { getParentArgv, safeRequireOr } = require("../../lib/helpers");

const script = process.env.REACT_RYO_CLI_SCRIPT;
const cliOptionsJSON = process.env.REACT_RYO_CLI_OPTIONS;
const consumerPath = process.env.REACT_RYO_CLI_CONSUMER_PATH;

const argv = getParentArgv();
const cliOptions = JSON.parse(cliOptionsJSON);
const allowedFilesPath = resolveAllowedFilesPath(consumerPath);
const allowedFiles = safeRequireOr(allowedFilesPath, []);
const allowedFilesDirname = allowedFilesPath && path.dirname(allowedFilesPath);

const {
  consumerCracoConfigPath,
  endConsumerCracoConfigPath
} = resolveAllCracoConfigFilePaths(consumerPath);

const endConsumerConfig = safeRequireOr(endConsumerCracoConfigPath, {});
const consumerConfig = safeRequireOr(consumerCracoConfigPath, {});

const getCracoConfig = () => {
  const defaultCracoConfig = getDefaultCracoConfig(script, {
    argv,
    cliOptions,
    allowedFiles,
    allowedFilesDirname
  });
  const cracoConfig = mergeCracoConfig(
    cliOptions.noExtend ? undefined : defaultCracoConfig,
    consumerConfig,
    cliOptions.noOverride ? undefined : endConsumerConfig
  );
  return cracoConfig;
};

const cracoConfig = getCracoConfig();

module.exports = cracoConfig;
