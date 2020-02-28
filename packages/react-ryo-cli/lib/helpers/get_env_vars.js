const { isObjectLike, camelCase } = require("lodash");
const { REACT_RYO_CLI_ENV_VAR_PREFIX } = require("../constants");

const getEnvironmentVariables = () =>
  Object.keys(process.env)
    .filter(key => key.includes(REACT_RYO_CLI_ENV_VAR_PREFIX))
    .reduce((accumulator, key) => {
      const replaceKey = camelCase(
        key.replace(REACT_RYO_CLI_ENV_VAR_PREFIX, "")
      );
      return {
        ...accumulator,
        [replaceKey]: isObjectLike(process.env[key])
          ? JSON.parse(process.env[key])
          : process.env[key]
      };
    }, {});

const getEnvVars = getEnvironmentVariables;

module.exports = { getEnvVars, getEnvironmentVariables };
