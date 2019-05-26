import React from 'react';
import Button from '../Button';
import styles from './styles.css';

const onClick = (): void => {
  alert('Oh.. You clicked me! ');
};

const App = () => (
  <main className={styles.Wrapper}>
    <h1 className={styles.Title}>React boilerplate</h1>

    <ul className={styles.FeatureList}>
      <li className={styles.Feature}>Uses React library as a base</li>
      <li className={styles.Feature}>
        Enables newest CSS syntax and features via PostCSS with modules
      </li>
      <li className={styles.Feature}>Provides types support via TypeScript</li>
      <li className={styles.Feature}>
        Has optimized production build via Terser
      </li>
      <li className={styles.Feature}>
        Has build-in component for rendering svg icons
      </li>
      <li className={styles.Feature}>
        Has many lint rules which take care of code syntax quality
      </li>
      <li className={styles.Feature}>Has Prettier support out of the box</li>
      <li className={styles.Feature}>
        Ships with tests environment based on Jest and react-testing-library
      </li>
      <li className={styles.Feature}>
        Automatically generates manifest.json along with favicons for all
        environments
      </li>
    </ul>

    <Button onClick={onClick}>Click me</Button>
  </main>
);

export default App;
