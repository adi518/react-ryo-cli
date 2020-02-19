const path = require("path");
const chalk = require("chalk");
const minimist = require("minimist");
const { spawn } = require("child_process");

const { SCRIPTS } = require("./scripts");
const logSignature = require("./signature");
const { normalizeScript } = require("./normalize");
const {
  preflight,
  silentLogger,
  resolveConfigFilePath,
  resolveAllowedFilesPath
} = require("./helpers");

const REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE =
  "Creating an optimized production build...";
const DEVELOPMENT_BUILD_MESSAGE =
  "Creating an unoptimized development build...";

const shouldReplaceProductionBuildMessage = (script, message) =>
  script === SCRIPTS.BUILD &&
  message.includes(REACT_SCRIPTS_PRODUCTION_BUILD_MESSAGE);

const { log } = console;

const spawnCli = () => {
  // Normalize our scripts to be `react-scripts` compatible,
  // e.g.: `test:production` will be mapped to `test`, and a coverage
  // flag will be set to `true` for adding a coverage report in production build.
  const [, argv1, ...restArgv] = process.argv;
  const dirname = path.dirname(argv1);
  const { _: [rawScript, ...restArgs] } = minimist(restArgv); // prettier-ignore
  const configPath = resolveConfigFilePath(dirname);
  const allowedFilesPath = resolveAllowedFilesPath(dirname);
  const scriptArgs = normalizeScript({ rawScript, configPath });
  const args = [...scriptArgs, ...restArgs];

  preflight({
    script: rawScript,
    logger: restArgs.inspect ? silentLogger : undefined
  }).invalid && process.exit();

  // https://stackoverflow.com/a/14231570/4106263
  // https://stackoverflow.com/a/42839682/4106263
  const child = spawn("node", args, {
    env: {
      FORCE_COLOR: true,
      CLI_DIRNAME: dirname,
      CONFIG_PATH: configPath,
      ALLOWED_FILES_PATH: allowedFilesPath,
      PARENT_ARGV: JSON.stringify(process.argv)
    }
  });

  const onData = data => {
    const message = data.toString();
    if (shouldReplaceProductionBuildMessage(rawScript, message)) {
      log(chalk.yellow(DEVELOPMENT_BUILD_MESSAGE));
    } else {
      log(message);
    }
  };
  const onError = error => process.exit(error);
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
