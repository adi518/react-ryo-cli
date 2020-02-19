const path = require("path");
const chalk = require("chalk");
const minimist = require("minimist");
const { spawn } = require("child_process");

const {
  preflight,
  silentLogger,
  resolveConfigFilePath,
  resolveAllowedFilesPath,
  shouldReplaceProductionBuildMessage
} = require("./helpers");

const logSignature = require("./signature");
const { getReactScript } = require("./get-react-script");
const { DEVELOPMENT_BUILD_MESSAGE } = require("./constants");

const { log } = console;

const spawnCli = () => {
  const [, argv1, ...restArgv] = process.argv;
  const dirname = path.dirname(argv1);
  const configPath = resolveConfigFilePath(dirname);
  const [script, ...restArgs] = minimist(restArgv)._;
  const allowedFilesPath = resolveAllowedFilesPath(dirname);
  // map our script to a `react-scripts` script,
  // e.g.: `test:production` will be mapped to `test`,
  // and a coverage flag will be set to `true` for adding
  // a coverage report in production build.
  const reactScript = getReactScript(script);
  const args = [...reactScript, ...restArgs];

  preflight({
    script,
    logger: restArgs.inspect ? silentLogger : undefined
  }).invalid && process.exit();

  // https://stackoverflow.com/a/14231570/4106263
  const child = spawn("node", args, {
    env: {
      // use `FORCE_COLOR` to retain child output colors.
      // https://stackoverflow.com/a/42839682/4106263
      FORCE_COLOR: true,
      CLI_DIRNAME: dirname,
      CONFIG_PATH: configPath,
      ALLOWED_FILES_PATH: allowedFilesPath,
      PARENT_ARGV: JSON.stringify(process.argv)
    }
  });

  const onData = data => {
    const message = data.toString();
    if (shouldReplaceProductionBuildMessage(script, message)) {
      log(chalk.yellow(DEVELOPMENT_BUILD_MESSAGE));
    } else {
      log(message);
    }
  };
  const onError = error => console.error(error);
  const onClose = code => {
    if (code !== 0) log(code);
    !restArgs.inspect && logSignature();
  };

  child.stdout.on("data", onData);
  child.stderr.on("data", onError);
  child.on("error", onError);
  child.on("close", onClose);

  return child;
};

module.exports = { spawnCli };
