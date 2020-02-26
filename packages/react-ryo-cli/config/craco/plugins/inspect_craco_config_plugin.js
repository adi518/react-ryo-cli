const { logger } = require("../../../lib/logger");
const { getParentArgv: getArgv } = require("../../../lib/helpers");

const inspectCracoConfigPlugin = ({ cracoConfig, pluginOptions }) => {
  if (!getArgv().inspect) return cracoConfig;
  if (pluginOptions.preText) logger.log(pluginOptions.preText);
  logger.log(JSON.stringify(cracoConfig, null, 4));
  process.exit();
};

module.exports = {
  plugin: { overrideCracoConfig: inspectCracoConfigPlugin },
  options: { preText: "Will log the Craco config:" }
};
