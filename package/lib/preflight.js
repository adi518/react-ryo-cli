const pkg = require("../package.json");
const REPOSITORY_URL = pkg.repository.url;
const ISSUES_URL = `${REPOSITORY_URL}/issues`;
const { SCRIPTS, SCRIPT_LIST } = require("./scripts");

const invalidAction = script =>
  `Invalid action - "${script}". Please provide a valid action (e.g. "start", "build" or "test"). See docs: ${REPOSITORY_URL}.`;

const NO_EJECT = `Eject is not allowed. If you require assistance, please open an issue: ${ISSUES_URL}.`;

const preflight = script => {
  if (script === SCRIPTS.EJECT) throw new Error(NO_EJECT);
  if (!SCRIPT_LIST.includes(script)) throw new Error(invalidAction(script));
};

module.exports = preflight;
