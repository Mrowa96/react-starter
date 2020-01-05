import React from 'react';
import classnames from 'classnames';
import ButtonProps from './typings';
import styles from './styles.css';

const Button = ({
  children,
  onClick,
  className,
  ...props
}: ButtonProps): JSX.Element => (
  <button
    data-testid={'button'}
    {...props}
    type="button"
    className={classnames(styles.Button, className)}
    onClick={onClick}>
    {children}
  </button>
);

export default Button;
