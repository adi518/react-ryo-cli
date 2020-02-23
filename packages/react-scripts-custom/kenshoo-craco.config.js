const { merge, cloneDeep } = require("lodash");
const { mergeDeep, SCRIPTS } = require("react-ryo-cli");

const pkg = require("../../package.json");

const getKenshooCssLoaderOptions = () => ({
  modules: {
    localIdentName: "kn-[name]__[local]___[hash:base64:5]"
  }
});

const cracoStyle = {
  style: {
    css: {
      loaderOptions: cssLoaderOptions =>
        mergeDeep(cssLoaderOptions, getKenshooCssLoaderOptions())
    }
  }
};

const cloneJestConfig = jestConfig => {
  const clone = {
    testMatch: [],
    setupFiles: [],
    setupFilesAfterEnv: [],
    snapshotSerializers: [],
    moduleNameMapper: {},
    collectCoverage: false
  };
  merge(clone, cloneDeep(jestConfig));
  return clone;
};

const extendJestConfig = (source, { script }) => {
  const jestConfig = cloneJestConfig(source);
  jestConfig.collectCoverage = script === SCRIPTS.BUILD;
  jestConfig.testMatch.push("<rootDir>/tests/**/*.{spec,test}.{js,jsx,ts,tsx}");
  jestConfig.setupFiles.push(`<rootDir>/node_modules/${pkg.name}/config/enzyme/enzyme_setup.js`); // prettier-ignore
  jestConfig.setupFilesAfterEnv.push(`<rootDir>/node_modules/${pkg.name}/config/jest/jest_setup.js`); // prettier-ignore
  jestConfig.moduleNameMapper["\\.(css|less|scss|sss|styl)$"] = "<rootDir>/node_modules/identity-obj-proxy"; // prettier-ignore
  jestConfig.moduleNameMapper["\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$"] = `<rootDir>/node_modules/${pkg.name}/config/jest/jest_file_mock.js`; // prettier-ignore
  jestConfig.snapshotSerializers.push("enzyme-to-json/serializer");
  jestConfig.snapshotSerializers.filter(snapshotSerializer => snapshotSerializer); // prettier-ignore
  return jestConfig;
};

module.exports = {
  cracoStyle,
  extendJestConfig
};
