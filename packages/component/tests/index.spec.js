import HelloWorld from "../src/index.js";

describe("HelloWorld", () => {
  it("renders", () => {
    const cmp = shallow(<HelloWorld />);

    expect(cmp).toMatchSnapshot();
  });
});
