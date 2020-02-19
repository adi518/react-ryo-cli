const figlet = require("figlet");
const pkg = require("../package.json");
const gradient = require("gradient-string");

// https://www.rapidtables.com/code/text/ascii/ascii-space.html
const logSignature = (
  signature = pkg.name,
  { theme = "instagram", color, font = "Small Slant", fullName } = {}
) => {
  if (signature === pkg.name)
    signature = fullName ? signature : signature.replace("react-", "");
  /* eslint-disable no-console */
  if (theme && !gradient[theme])
    return console.error(
      `No such theme as "${theme}". See https://www.npmjs.com/package/gradient-string#available-built-in-gradients for a list of available themes.`
    );
  const ascii = figlet.textSync(`\x20${signature}`, {
    font,
    horizontalLayout: "default",
    verticalLayout: "default"
  });
  if (theme) {
    console.log(gradient[theme](ascii));
  } else if (color) {
    console.log(gradient(color)(ascii));
  } else {
    console.log(ascii);
  }
  console.log("\n");
};

module.exports = logSignature;
