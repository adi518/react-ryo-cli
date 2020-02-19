const inquirer = require("inquirer");
const PACKAGE_MANAGERS = { NPM: "npm", YARN: "yarn" };

const selectPackageManager = () => {
  const questions = [
    {
      type: "list",
      name: "packageManager",
      message: "Which package manager?",
      choices: [PACKAGE_MANAGERS.YARN, PACKAGE_MANAGERS.NPM]
    }
  ];
  return inquirer.prompt(questions);
};

module.exports = { selectPackageManager };
