const { getArgv } = require("./helpers");
const logSignature = require("./signature");

const { theme, font, full } = getArgv();

logSignature(undefined, {
  theme,
  font,
  fullName: full
});
