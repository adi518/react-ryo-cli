// https://gist.github.com/fokusferit/e4558d384e4e9cab95d04e5f35d4f913

const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

Enzyme.configure({ adapter: new Adapter() });

const { shallow, render, mount } = Enzyme;

global.shallow = shallow;
global.render = render;
global.mount = mount;
