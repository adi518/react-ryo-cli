const { getCssLoaderOptions } = require("../webpack/webpack_helpers");

module.exports = {
  type: "react-component",
  webpack: {
    rules: {
      "sass-css": getCssLoaderOptions()
    }
  },
  npm: {
    esModules: true,
    umd: {
      global: "KFoo",
      externals: {
        "react": "React", // prettier-ignore
        "react-dom": "react-dom",
        "styled-components": "styled-components"
      }
    }
  }
};
