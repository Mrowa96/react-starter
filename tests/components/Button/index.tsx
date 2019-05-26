import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Button from '../../../src/components/Button';
import 'jest-dom/extend-expect';

describe('Button component', () => {
  let component;
  let onClick;

  beforeEach(() => {
    onClick = jest.fn();
    component = <Button onClick={onClick}>Test label</Button>;
  });

  afterEach(cleanup);

  it('should render button with text label', () => {
    const { getByTestId } = render(component);

    expect(getByTestId('button')).toHaveTextContent('Test label');
  });

  it('should trigger onClick method', () => {
    const { getByTestId } = render(component);

    fireEvent.click(getByTestId('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have button type', () => {
    const { getByTestId } = render(component);

    expect(getByTestId('button')).toHaveAttribute('type', 'button');
  });
});
