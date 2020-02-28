const spawn = require("cross-spawn");
const { throwError } = require("../utils");

const spawnChild = (
  command,
  args,
  {
    onData = () => {},
    onError = throwError,
    onClose = () => {},
    stdio = "inherit",
    ...restOptions
  } = {}
) => {
  const child = spawn(command, args, { stdio, ...restOptions });
  child.stdout && child.stdout.on("data", onData);
  child.stderr && child.stderr.on("data", onError);
  child.on("error", onError);
  child.on("close", onClose);
  return child;
};

module.exports = spawnChild;
