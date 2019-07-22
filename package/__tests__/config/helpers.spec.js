const { SCRIPTS } = require("../../config/scripts.js");
const {
  Args,
  preflight,
  getLibraryName,
  normalizeScript
} = require("../../config/helpers.js");

console.log = () => {}; // eslint-disable-line
console.error = () => {}; // eslint-disable-line

describe("preflight", () => {
  it("should return falsy for eject script", () => {
    expect(preflight({ script: "eject" })).toBe(false);
  });

  it("should return truthy for verified scripts", () => {
    const VERIFIED_SCRIPTS = { ...SCRIPTS };
    delete VERIFIED_SCRIPTS.EJECT;

    const results = Object.values(VERIFIED_SCRIPTS)
      .map(script => preflight({ script }))
      .every(result => result);

    expect(results).toBe(true);
  });
});

describe("getLibraryName", () => {
  it("should return in pascal case", () => {
    expect(getLibraryName({ name: "foo-bar" })).toMatchSnapshot();
  });
});

describe("Args class", () => {
  it("should prepend Craco binary argument", () => {
    expect(new Args("foo").prependCracoBin()).toMatchSnapshot();
  });

  it("should append Craco configuration arguments", () => {
    expect(new Args("foo").appendCracoConfig()).toMatchSnapshot();
  });

  it("should add Craco arguments", () => {
    expect(new Args("foo").addCraco()).toMatchSnapshot();
  });
});

describe("normalizeScript", () => {
  test("build", () => {
    expect(normalizeScript({ rawScript: SCRIPTS.BUILD })).toMatchSnapshot();
  });

  test("build:production", () => {
    expect(
      normalizeScript({ rawScript: SCRIPTS.BUILD_PRODUCTION })
    ).toMatchSnapshot();
  });

  test("build:package", () => {
    expect(
      normalizeScript({ rawScript: SCRIPTS.BUILD_PACKAGE })
    ).toMatchSnapshot();
  });

  test("build:package:production", () => {
    expect(
      normalizeScript({ rawScript: SCRIPTS.BUILD_PACKAGE_PRODUCTION })
    ).toMatchSnapshot();
  });

  test("build:stats", () => {
    expect(
      normalizeScript({ rawScript: SCRIPTS.BUILD_STATS })
    ).toMatchSnapshot();
  });

  test("test", () => {
    expect(normalizeScript({ rawScript: SCRIPTS.TEST })).toMatchSnapshot();
  });

  test("test:watch", () => {
    expect(
      normalizeScript({ rawScript: SCRIPTS.TEST_WATCH })
    ).toMatchSnapshot();
  });

  test("test:update", () => {
    expect(
      normalizeScript({ rawScript: SCRIPTS.TEST_UPDATE })
    ).toMatchSnapshot();
  });

  test("test:production", () => {
    expect(
      normalizeScript({ rawScript: SCRIPTS.TEST_PRODUCTION })
    ).toMatchSnapshot();
  });

  test("eject", () => {
    expect(normalizeScript({ rawScript: SCRIPTS.EJECT })).toMatchSnapshot();
  });
});
