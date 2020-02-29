const pkg = require("../package.json");
const REPOSITORY_URL = pkg.repository.url;
const { SCRIPTS, SCRIPT_LIST } = require("./constants");

const noEject = ({ bugsUrl }) => {
  if (bugsUrl)
    return `Eject is not allowed. If you require assistance, please open an issue: ${bugsUrl}.`;
  return `Eject is not allowed. If you require assistance, please seek your technical supervisor.`;
};

class EjectError extends Error {
  constructor(message) {
    super(message);
    this.name = "EjectError";
  }
}

const invalidScript = script =>
  `Invalid action - "${script}". Please provide a valid script (e.g. "start", "build" or "test"). See docs: ${REPOSITORY_URL}.`;

class InvalidScriptError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidScriptError";
  }
}

const preflight = (script, { bugsUrl } = {}) => {
  if (script === SCRIPTS.EJECT) throw new EjectError(noEject({ bugsUrl }));
  if (!SCRIPT_LIST.includes(script))
    throw new InvalidScriptError(invalidScript(script));
};

module.exports = { preflight, EjectError, InvalidScriptError };
