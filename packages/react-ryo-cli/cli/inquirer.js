const inquirer = require("inquirer");
const { PACKAGE_MANAGERS } = require("../lib/constants");

const choosePackageManager = () =>
  inquirer.prompt([
    {
      type: "list",
      name: "packageManager",
      message: "Which package manager?",
      choices: [PACKAGE_MANAGERS.YARN, PACKAGE_MANAGERS.NPM]
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

const confirmInstallCracoPeerDep = () =>
  inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "@craco/craco is a peer dependency, install?"
    }
  ]);

module.exports = {
  confirmUpdateScripts,
  choosePackageManager,
  confirmInstallCracoPeerDep,
  confirmDirectoryNotEmptyChoice
};
