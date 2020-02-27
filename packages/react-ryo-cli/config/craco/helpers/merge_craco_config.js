const { merge } = require("lodash");
const babelMerge = require("babel-merge");
const webpackMerge = require("webpack-merge");

const mergeCracoConfig = (initialSource, ...restSources) => {
  return restSources
    .filter(source => source)
    .reduce((cracoConfig, { babel = {}, /* webpack = {} */ ...restSource }) => {
      const {
        babel: currentBabel = {},
        // webpack: currentWebpack = {},
        ...restCracoConfig
      } = cracoConfig;
      cracoConfig = merge(restCracoConfig, restSource, {
        babel: babelMerge(currentBabel, babel)
        // webpack: webpackMerge(currentWebpack.configure, webpack.configure)
      });
      return cracoConfig;
    }, initialSource);
};

module.exports = mergeCracoConfig;
