const { getArgv } = require("./helpers");
const logSignature = require("./signature");

const { theme } = getArgv();

logSignature(undefined, theme);
