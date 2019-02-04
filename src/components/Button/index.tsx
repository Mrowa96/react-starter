import * as React from 'react';

const styles = require('./styles.css');

type Props = {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default ({ label, onClick }: Props) => (
  <button type="button" className={styles.Button} onClick={onClick}>
    {label}
  </button>
);
