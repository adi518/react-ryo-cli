const { getParentArgv: getArgv } = require("../../../lib/helpers");

const injectDefaultsPlugin = ({ cracoConfig }) => {
  if (!getArgv().noExtend) return cracoConfig;

  return cracoConfig;
};

module.exports = {
  plugin: { overrideCracoConfig: injectDefaultsPlugin }
};
