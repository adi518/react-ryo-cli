const { getArgv } = require("./helpers");
const logSignature = require("./log_signature");

const { theme, font, full } = getArgv();

logSignature(undefined, {
  theme,
  font,
  fullName: full
});
