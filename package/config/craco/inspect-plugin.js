const { getParentArgv } = require("../../lib/helpers");

const inspectPlugin = ({ webpackConfig }) => {
  if (getParentArgv().inspect) {
    console.log(JSON.stringify(webpackConfig, null, 4));
    process.exit();
  }
  return webpackConfig;
};

module.exports = { inspectPlugin };
