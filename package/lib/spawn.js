const path = require("path");
const minimist = require("minimist");
const { spawn } = require("child_process");

const logSignature = require("./signature");
const { normalizeScript } = require("./normalize");
const {
  preflight,
  silentLogger,
  resolveConfigFilePath,
  resolveAllowedFilesPath
} = require("./helpers");

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
  const allArgs = [...scriptArgs, ...restArgs];
  if (
    preflight({
      script: rawScript,
      logger: restArgs.inspect ? silentLogger : undefined
    })
  ) {
    const script = spawn("node", allArgs, {
      stdio: "inherit",
      env: {
        CLI_DIRNAME: dirname,
        CONFIG_PATH: configPath,
        ALLOWED_FILES_PATH: allowedFilesPath,
        PARENT_ARGV: JSON.stringify(process.argv)
      }
    });
    const onError = err => process.exit(err);
    const onClose = code => {
      !restArgs.inspect && logSignature();
      process.exit(code);
    };
    script.on("error", onError);
    script.on("close", onClose);
    return script;
  }
};

module.exports = { spawnCli };
