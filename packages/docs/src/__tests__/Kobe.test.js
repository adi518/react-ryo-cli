import Kobe from 'components/Kobe';

describe('Kobe', () => {
  it('renders', () => {
    const wrapper = shallow(<Kobe />);
    expect(wrapper).toMatchSnapshot();
  });
});
