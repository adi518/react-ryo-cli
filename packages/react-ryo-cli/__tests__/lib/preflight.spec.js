const { SCRIPTS } = require("../../lib/constants");
const {
  preflight,
  EjectError,
  InvalidScriptError
} = require("../../lib/preflight");

describe("preflight", () => {
  it("should throw for eject script", () => {
    try {
      preflight("eject");
    } catch (err) {
      expect(err).toBeInstanceOf(EjectError);
    }
  });

  it("should throw for invalid script", () => {
    try {
      preflight("unknown");
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidScriptError);
    }
  });

  it("should not throw for valid scripts", () => {
    // eslint-disable-next-line no-unused-vars
    const { EJECT, ...VALID_SCRIPTS } = SCRIPTS;

    expect(() =>
      Object.values(VALID_SCRIPTS).forEach(script => preflight(script))
    ).not.toThrow();
  });
});
