const fs = require("fs");
const detectIndent = require("detect-indent");
const { flow, entries, filter, sortBy, merge } = require("lodash/fp");

const { SCRIPTS } = require("../../lib/scripts");
const { throwError } = require("../../lib/utils");
const { resolveCwd } = require("../../lib/helpers");
const { PACKAGE_JSON } = require("../../lib/constants");

const {
  JSONStringifyPretty,
  getConfirmUpdateScripts
} = require("../cli_helpers");

const template = require("../../templates/scripts.template");
const extendedTemplate = require("../../templates/scripts.extended.template");

const getScripts = (prefix, extend) => {
  // object order is not guaranteed, so
  // `start` script can end undesirably relocated,
  // so we'll drop it and prepend it later.
  const scripts = flow(
    entries,
    filter(([key]) => key !== SCRIPTS.START),
    sortBy(([key]) => key)
  )({ ...template, ...(extend && extendedTemplate) });
  scripts.unshift([SCRIPTS.START, SCRIPTS.START]);
  return scripts.reduce(
    (scripts, [name, command]) => ({
      ...scripts,
      [name]: `${prefix} ${command}`
    }),
    {}
  );
};

const MISSING_CLI_ARGUMENT = `You must provide a Cli argument, e.g.: --cli="myCli".`;
const DEFAULT_JSON_INDENT = 2;

const updateScripts = async ({ cli: cliName, extend }) => {
  if (!cliName) throw new Error(MISSING_CLI_ARGUMENT);
  const confirm = await getConfirmUpdateScripts().catch(throwError);
  if (!confirm) return;
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
