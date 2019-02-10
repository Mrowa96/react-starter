import React from 'react';
import styles from './styles.css';

type Props = {
  label: string,
  onClick?: Function,
};

const Button = ({ label, onClick }: Props) => (
  <button type="button" className={styles.Button} onClick={onClick}>
    {label}
  </button>
);

Button.defaultProps = {
  onClick: undefined,
};

export default Button;
