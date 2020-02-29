const { SCRIPTS } = require("../../lib/constants");
const getCracoScript = require("../../lib/helpers/get_craco_script");

describe("getCracoScript", () => {
  test("build", () => {
    expect(getCracoScript(SCRIPTS.BUILD)).toMatchSnapshot();
  });

  test("build", () => {
    expect(getCracoScript(SCRIPTS.BUILD)).toMatchSnapshot();
  });

  test("build:development", () => {
    expect(getCracoScript(SCRIPTS.BUILD_DEVELOPMENT)).toMatchSnapshot();
  });

  test("build:package", () => {
    expect(getCracoScript(SCRIPTS.BUILD_PACKAGE)).toMatchSnapshot();
  });

  test("build:package:development", () => {
    expect(getCracoScript(SCRIPTS.BUILD_PACKAGE_DEVELOPMENT)).toMatchSnapshot();
  });

  test("build:stats", () => {
    expect(getCracoScript(SCRIPTS.BUILD_STATS)).toMatchSnapshot();
  });

  test("test", () => {
    expect(getCracoScript(SCRIPTS.TEST)).toMatchSnapshot();
  });

  test("test:watch", () => {
    expect(getCracoScript(SCRIPTS.TEST_WATCH)).toMatchSnapshot();
  });

  test("test:update", () => {
    expect(getCracoScript(SCRIPTS.TEST_UPDATE)).toMatchSnapshot();
  });

  test("test:production", () => {
    expect(getCracoScript(SCRIPTS.TEST_PRODUCTION)).toMatchSnapshot();
  });

  test("eject", () => {
    expect(getCracoScript(SCRIPTS.EJECT)).toMatchSnapshot();
  });
});
