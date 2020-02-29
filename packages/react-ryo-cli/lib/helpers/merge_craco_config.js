const babelMerge = require("babel-merge");
const webpackMerge = require("webpack-merge");
const { set, size, isEmpty, isPlainObject } = require("lodash");

const { deepMerge } = require("../helpers");

const createFnsReducer = (fns, merger) => (...args) =>
  fns.reduce((acc, fn) => merger(acc, fn(...args)), {});

const mergeFn = (acc, fn) => {
  if (!fn) return;
  if (isPlainObject(fn)) fn = () => fn;
  acc.push(fn);
};

const mergeFnOption = (obj, path, fns, merger) => {
  if (isEmpty(fns)) return;
  set(obj, path, createFnsReducer(fns, merger));
};

// https://github.com/gsoft-inc/craco/tree/master/packages/craco#configuration-overview
const mergeCracoConfig = (...restSources) => {
  const merged = restSources
    .filter(source => size(source))
    .reduce(
      (
        acc,
        {
          devServer,
          style: {
            css: cssLoaderOptions,
            sass: sassLoaderOptions,
            postcss: postcssLoaderOptions
          } = {},
          eslint: {
            configure: eslintConfigure,
            loaderOptions: eslintLoaderOptions,
            ...restEslint
          } = {},
          webpack: { configure: webpackConfigure, ...restWebpack } = {},
          babel: { loaderOptions: babelLoaderOptions, ...restBabel } = {},
          jest: { configure: jestConfigure, ...restJest } = {},
          ...restSource
        }
      ) => {
        // Craco accepts either an object or a function, so
        // to make this easy, we are going to normalize every
        // configuration into a function and then collect it into
        // an array of configuration functions. Once ready, we will
        // transform the collection of functions into a reducer function
        // that will be invoked by Craco and return a merged configuration.
        acc.config = deepMerge(acc.config, restSource, {
          jest: restJest,
          babel: restBabel,
          eslint: restEslint,
          webpack: restWebpack
        });
        mergeFn(acc.devServer, devServer);
        mergeFn(acc.jestConfigure, jestConfigure);
        mergeFn(acc.eslintConfigure, eslintConfigure);
        mergeFn(acc.webpackConfigure, webpackConfigure);
        mergeFn(acc.cssLoaderOptions, cssLoaderOptions);
        mergeFn(acc.sassLoaderOptions, sassLoaderOptions);
        mergeFn(acc.postcssLoaderOptions, postcssLoaderOptions);
        mergeFn(acc.eslintLoaderOptions, eslintLoaderOptions);
        mergeFn(acc.babelLoaderOptions, babelLoaderOptions);
        return acc;
      },
      {
        config: {},
        desServer: [],
        jestConfigure: [],
        eslintConfigure: [],
        webpackConfigure: [],
        cssLoaderOptions: [],
        sassLoaderOptions: [],
        postcssLoaderOptions: [],
        eslintLoaderOptions: [],
        babelLoaderOptions: []
      }
    );
  mergeFnOption(merged.config, 'devServer', merged.devServer, deepMerge); // prettier-ignore
  mergeFnOption(merged.config, 'jest.configure', merged.jestConfigure, deepMerge); // prettier-ignore
  mergeFnOption(merged.config, 'eslint.configure', merged.eslintConfigure, deepMerge); // prettier-ignore
  mergeFnOption(merged.config, 'webpack.configure', merged.webpackConfigure, webpackMerge); // prettier-ignore
  mergeFnOption(merged.config, 'babel.loaderOptions', merged.babelLoaderOptions, babelMerge); // prettier-ignore
  mergeFnOption(merged.config, 'eslint.loaderOptions', merged.eslintLoaderOptions, deepMerge); // prettier-ignore
  mergeFnOption(merged.config, 'style.css.loaderOptions', merged.cssLoaderOptions, deepMerge); // prettier-ignore
  mergeFnOption(merged.config, 'style.sass.loaderOptions', merged.sassLoaderOptions, deepMerge); // prettier-ignore
  mergeFnOption(merged.config, 'style.postcss.loaderOptions', merged.postcssLoaderOptions, deepMerge); // prettier-ignore
  return merged.config;
};

module.exports = mergeCracoConfig;
