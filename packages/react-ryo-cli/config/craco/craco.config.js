// https://github.com/facebook/create-react-app/issues/7227
// https://gist.github.com/adi518/048056495daf508b0253da4ac5ddc921
// https://github.com/styled-components/jest-styled-components#global-installation
// https://github.com/kenshoo/react-core/blob/d5cfb38e334d2bf07ad27be49d68f4b3a76f65b4/.storybook/webpack.config.js

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
