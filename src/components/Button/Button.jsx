import React from 'react';
import styles from './Button.css';

export default ({ label, onClick }) => (
  <button className={styles.Button} type="button" onClick={onClick}>
    {label}
  </button>
);
