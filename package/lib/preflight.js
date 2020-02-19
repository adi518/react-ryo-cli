const chalk = require("chalk");

const pkg = require("../package.json");
const REPOSITORY_URL = pkg.repository.url;
const ISSUES_URL = `${REPOSITORY_URL}/issues`;
const { SCRIPTS, SCRIPT_LIST } = require("./scripts");

const logError = () => console.error(chalk.red.call(this, arguments));

const preflight = ({ script }) => {
  const result = { valid: true, invalid: false };
  /* eslint-disable no-console */
  if (!SCRIPT_LIST.includes(script)) {
    logError(
      `Invalid action - "${script}". Please provide a valid action (e.g. "start", "build" or "test"). See docs: ${REPOSITORY_URL}.`
    );
    return (result.invalid = true);
  }
  if (script === SCRIPTS.EJECT) {
    logError(
      `Eject is not allowed. If you require assistance, please open an issue: ${ISSUES_URL}.`
    );
    return (result.invalid = true);
  }
  result.valid = !result.invalid;
  return result;
};

module.exports = preflight;
