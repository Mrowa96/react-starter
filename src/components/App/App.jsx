import React from 'react';
import styles from './App.css';
import Button from '../Button/Button';

export default () => (
  <>
    <p className={styles.Message}>Welcome to frontend boilerplate!</p>
    <input type="text" placeholder="Write something" />
    <Button label="Some label" />
  </>
);
