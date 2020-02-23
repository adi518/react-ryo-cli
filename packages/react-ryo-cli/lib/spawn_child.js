const spawn = require("cross-spawn");

const spawnChild = (
  command,
  args,
  { onData, onError, onClose, ...options }
) => {
  const child = spawn(command, args, options);
  child.stdout && child.stdout.on("data", onData);
  child.stderr && child.stderr.on("data", onError);
  child.on("error", onError);
  child.on("close", onClose);
  return child;
};

module.exports = spawnChild;
