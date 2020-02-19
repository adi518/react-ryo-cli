const inquirer = require("inquirer");
const PACKAGE_MANAGERS = { NPM: "npm", YARN: "yarn" };

const selectPackageManager = () => {
  const questions = [
    {
      type: "list",
      name: "packageManager",
      choices: [PACKAGE_MANAGERS.YARN, PACKAGE_MANAGERS.NPM],
      message: "Which package manager?"
    }
  ];
  return inquirer.prompt(questions);
};

module.exports = { selectPackageManager };
