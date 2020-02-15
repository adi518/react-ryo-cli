const path = require("path");
const minimist = require("minimist");
const { spawn } = require("child_process");

const { normalizeScript } = require("./normalize");
const {
  preflight,
  getConfigPath,
  silentLogger,
  logSignature
} = require("./helpers");

const spawnCli = () => {
  // Normalize our scripts to be `react-scripts` compatible,
  // e.g.: `test:production` will be mapped to `test`, and a coverage
  // flag will be set to `true` for adding a coverage report in production build.
  const [, argv1, ...restArgv] = process.argv;
  const dirname = path.dirname(argv1);
  const { _: [rawScript, ...restArgs] } = minimist(restArgv); // prettier-ignore
  const configPath = getConfigPath(dirname);
  const scriptArgs = normalizeScript({ rawScript, configPath });
  const allArgs = [...scriptArgs, ...restArgs];
  if (
    preflight({
      script: rawScript,
      logger: restArgs.inspect ? silentLogger : undefined
    })
  ) {
    const runScript = spawn("node", allArgs, {
      stdio: "inherit",
      env: {
        CONFIG_PATH: configPath,
        PARENT_ARGV: JSON.stringify(process.argv)
      }
    });
    runScript.on("error", err => process.exit(err));
    runScript.on("close", code => {
      !restArgs.inspect && logSignature();
      process.exit(code);
    });
  }
};

module.exports = { spawnCli };
