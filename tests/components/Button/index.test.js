import Button from '../../../src/components/Button';

describe('Button component', () => {
  let component;
  let onClick;

  beforeEach(() => {
    onClick = jest.fn();
    component = shallow(<Button label="Test label" onClick={onClick} />);
  });

  it('should render button with label', () => {
    expect(component.text()).toEqual('Test label');
  });

  it('should trigger onClick method', () => {
    component.simulate('click');

    expect(onClick.mock.calls.length === 1).toBeTruthy();
  });
});
