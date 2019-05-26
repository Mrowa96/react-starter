import React, { ReactChildren } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

type ButtonProps = {
  className?: string;
  children: ReactChildren | string;
  onClick?: () => void;
};

const Button = ({ children, onClick, className, ...props }: ButtonProps) => (
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
