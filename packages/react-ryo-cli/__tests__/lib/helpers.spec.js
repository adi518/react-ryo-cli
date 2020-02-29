const {
  getLibraryName,
  getCracoCliCommandCreator
} = require("../../lib/helpers.js");

console.log = () => {}; // eslint-disable-line
console.error = () => {}; // eslint-disable-line

describe("getLibraryName", () => {
  it("should return in pascal case", () => {
    expect(getLibraryName({ name: "foo-bar" })).toMatchSnapshot();
  });
});

describe("getCracoCliCommandCreator", () => {
  it("should add Craco arguments", () => {
    const createCracoCliCommand = getCracoCliCommandCreator();
    expect(createCracoCliCommand("foo")).toMatchSnapshot();
  });
});
