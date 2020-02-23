const fs = require("fs");
const { merge } = require("lodash");
const detectIndent = require("detect-indent");

const { logger } = require("../lib/logger");
const { SCRIPTS } = require("../lib/scripts");
const { resolveCwd } = require("../lib/helpers");
const { PACKAGE_JSON } = require("../lib/constants");
const { JSONStringifyPretty } = require("../lib/cli_helpers");

const scriptsTemplate = require("../templates/scripts.template");
const extendedScriptsTemplate = require("../templates/scripts.extended.template");

const getScripts = (prefix, extend) => {
  const scripts = [
    ...Object.entries(scriptsTemplate),
    ...(extend ? Object.entries(extendedScriptsTemplate) : [])
  ]
    .filter(([key]) => key !== SCRIPTS.START)
    .sort();
  scripts.unshift([SCRIPTS.START, SCRIPTS.START]);
  return scripts.reduce(
    (scripts, [name, script]) => ({
      ...scripts,
      [name]: `${prefix} ${script}`
    }),
    {}
  );
};

const MISSING_CLI_ARGUMENT = `You must provide a Cli argument, e.g.: --cli="myCli".`;
const DEFAULT_JSON_INDENT = 2;

const updateScripts = ({ cli: cliName, extend }) => {
  if (!cliName) logger.error(MISSING_CLI_ARGUMENT);
  const packageJSONPath = resolveCwd(PACKAGE_JSON);
  const packageJSONString = fs.readFileSync(packageJSONPath, "utf-8");
  const packageJSONIndent =
    detectIndent(packageJSONString).indent || DEFAULT_JSON_INDENT;
  const packageJSON = JSON.parse(packageJSONString);
  fs.writeFileSync(
    packageJSONPath,
    JSONStringifyPretty(
      merge(packageJSON, { scripts: getScripts(cliName, extend) }),
      packageJSONIndent
    )
  );
};

module.exports = updateScripts;
