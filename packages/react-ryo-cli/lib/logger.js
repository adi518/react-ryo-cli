const chalk = require("chalk");

const logger = {
  log: (...args) => console.error(chalk.white(args)),
  error: (...args) => console.error(chalk.red(args)),
  warn: (...args) => console.error(chalk.yellow(args)),
  success: (...args) => console.error(chalk.green(args))
};

const silentLogger = { log: () => {}, error: () => {} };

module.exports = {
  logger,
  silentLogger
};
