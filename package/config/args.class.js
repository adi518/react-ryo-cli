const { resolve } = require("./utils");

const CRACO_BIN_PATH = "./node_modules/@craco/craco/bin/craco.js";
const CRACO_CONFIG_PATH = resolve("config/craco/craco.config.js");
const NWB_BIN_PATH = "./node_modules/nwb/lib/bin/nwb.js";
const NWB_CONFIG_PATH = resolve("config/nwb/nwb.config.js");

class Args {
  constructor(args) {
    this.args = [].concat(args);
  }
}

class CracoArgs extends Args {
  constructor(args) {
    super(args);
  }

  prependBin() {
    return [CRACO_BIN_PATH].concat(this.args);
  }

  appendConfig() {
    return this.args.concat(["--config", CRACO_CONFIG_PATH]);
  }

  add() {
    const cracoBin = this.prependBin();
    const cracoConfig = this.appendConfig();
    return [...new Set(cracoBin.concat(cracoConfig))];
  }
}

class NwbArgs extends Args {
  constructor(args) {
    super(args);
  }

  prependBin() {
    return [NWB_BIN_PATH].concat(this.args);
  }

  appendConfig() {
    return this.args.concat(["--config", NWB_CONFIG_PATH]);
  }

  add() {
    const nwbBin = this.prependBin();
    const nwbConfig = this.appendConfig();
    return [...new Set(nwbBin.concat(nwbConfig))];
  }
}

module.exports = { CracoArgs };
