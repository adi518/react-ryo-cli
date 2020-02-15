const chalk = require("chalk");

const pkg = require("../package.json");
const REPOSITORY_URL = pkg.repository.url;
const ISSUES_URL = `${REPOSITORY_URL}/issues`;
const { SCRIPTS, SCRIPT_LIST } = require("./scripts");

const preflight = ({ script, logger = console }) => {
  /* eslint-disable no-console */
  if (!SCRIPT_LIST.includes(script)) {
    logger.error(
      chalk.red(
        `Invalid action - "${script}". Please provide a valid action (e.g. "start", "build" or "test"). See docs: ${REPOSITORY_URL}.`
      )
    );
    return false;
  }
  if (script === SCRIPTS.EJECT) {
    logger.error(
      chalk.red(
        `Eject is not allowed. If you require assistance, please open an issue: ${ISSUES_URL}.`
      )
    );
    return false;
  }
  if (script === SCRIPTS.BUILD) {
    logger.log(
      chalk.yellow(
        `Creating an unoptimized development build (ignore next line message)...`
      )
    );
  }
  return true;
};

module.exports = preflight;
