const inquirer = require("inquirer");

const choosePackageManager = () =>
  inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Which package manager?",
      choices: ["yarn", "npm"]
    }
  ]);

const confirmDirectoryNotEmptyChoice = () =>
  inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Directory is not empty, are you sure?"
    }
  ]);

const confirmUpdateScripts = () =>
  inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Update scripts in package.json?"
    }
  ]);

module.exports = {
  confirmUpdateScripts,
  choosePackageManager,
  confirmDirectoryNotEmptyChoice
};
