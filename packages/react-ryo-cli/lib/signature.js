const figlet = require("figlet");
const pkg = require("../package.json");
const gradient = require("gradient-string");

// https://www.rapidtables.com/code/text/ascii/ascii-space.html
const getSignature = (
  signature = pkg.name,
  { font = "Small Slant", fullName } = {}
) => {
  if (signature === pkg.name)
    signature = fullName ? signature : signature.replace("react-", "");
  return figlet.textSync(`\x20${signature}`, {
    font,
    horizontalLayout: "default",
    verticalLayout: "default"
  });
};

const logSignature = (
  signature,
  { theme = "instagram", gradient: ownGradient } = {}
) => {
  /* eslint-disable no-console */
  if (theme && !gradient[theme])
    return console.error(
      `No such theme as "${theme}". See https://www.npmjs.com/package/gradient-string#available-built-in-gradients for a list of available themes.`
    );
  if (ownGradient) {
    console.log(gradient(ownGradient)(signature));
  } else if (theme) {
    console.log(gradient[theme](signature));
  } else {
    console.log(signature);
  }
  console.log("\n");
};

module.exports = { logSignature, getSignature };
