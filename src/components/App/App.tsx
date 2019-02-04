import * as React from 'react';
import Button from '../Button';

const styles = require('./App.css');

export default () => (
  <>
    <p className={styles.Message}>Welcome to frontend boilerplate!</p>
    <input type="text" placeholder="Write something" />
    <Button label="Some label" />
  </>
);
