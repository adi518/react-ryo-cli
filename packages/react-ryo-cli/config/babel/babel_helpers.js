const getDefaultBabelConfig = () => ({
  babel: {
    // transform Lodash imports to tree-shake
    // compatible syntax with `babel-plugin-lodash`.
    // See: https://www.azavea.com/blog/2019/03/07/lessons-on-tree-shaking-lodash/
    plugins: ["lodash"]
  }
});

module.exports = { getDefaultBabelConfig };
