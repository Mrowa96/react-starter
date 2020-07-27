import React from 'react';
import classnames from 'classnames';
import ButtonProps from './Button.types';
import styles from './Button.styles.scss';

export default function Button({ children, onClick, className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      data-testid='button'
      {...props}
      type='button'
      className={classnames(styles.Button, className)}
      onClick={onClick}>
      {children}
    </button>
  );
}
