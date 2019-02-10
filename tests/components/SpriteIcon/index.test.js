import SpriteIcon from '../../../src/components/SpriteIcon';

describe('SpriteIcon component', () => {
  it('should render something', () => {
    const component = shallow(<SpriteIcon name="test" />);

    expect(component).not.toBeEmptyRender();
  });
});
