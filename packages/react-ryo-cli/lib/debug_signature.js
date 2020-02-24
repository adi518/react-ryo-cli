const { getArgv } = require("./helpers");
const { logSignature, getSignature } = require("./signature");

const { theme, font, full } = getArgv();
const signature = getSignature(undefined, { font, fullName: full });

logSignature(signature, { theme });
