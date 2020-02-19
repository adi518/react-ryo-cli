const figlet = require("figlet");
const pkg = require("../package.json");
const gradient = require("gradient-string");

// https://www.rapidtables.com/code/text/ascii/ascii-space.html
const logSignature = (
  signature = pkg.name,
  theme,
  color = ["rgb(102, 51, 153)", "rgb(102, 51, 153)"]
) => {
  /* eslint-disable no-console */
  if (theme && !gradient[theme])
    return console.error(
      `No such theme as "${theme}". See https://www.npmjs.com/package/gradient-string#available-built-in-gradients for a list of possible themes.`
    );
  const ascii = figlet.textSync(`\x20${signature}`, {
    font: "Slant",
    horizontalLayout: "default",
    verticalLayout: "default"
  });
  console.log(theme ? gradient[theme](ascii) : gradient(color)(ascii));
};

module.exports = logSignature;
