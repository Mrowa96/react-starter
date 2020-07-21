import React from 'react';
import Button from '.';

export const withText = (): JSX.Element => <Button>Ordinary button</Button>;
export const withClickHandler = (): JSX.Element => (
  // eslint-disable-next-line no-alert
  <Button onClick={() => alert('Clicked!')}>Button with click handler</Button>
);

export default { title: 'Button' };
