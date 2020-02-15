const { logSignature, getArgv } = require("./helpers");

const { theme } = getArgv();

logSignature(undefined, theme);
