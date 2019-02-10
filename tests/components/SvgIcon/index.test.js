import SvgIcon from '../../../src/components/SvgIcon';

describe('SvgIcon component', () => {
  it('should render span if svg exists', () => {
    const component = mount(<SvgIcon name="test" width={25} />);

    expect(component.find('span')).toBeTruthy();
  });
});
