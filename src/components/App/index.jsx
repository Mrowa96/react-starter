import React from 'react';
import styles from './styles.css';

const App = () => (
  <main className={styles.Wrapper}>
    <h1 className={styles.Title}>React boilerplate</h1>

    <ul className={styles.FeatureList}>
      <li className={styles.Feature}>Uses React library as a base</li>
      <li className={styles.Feature}>
        Enables newest CSS syntax and features via PostCSS with modules
      </li>
      <li className={styles.Feature}>
        Enables newest JavaScript syntax and features via Babel
      </li>
      <li className={styles.Feature}>
        Extends JavaScript syntax with types from Flow
      </li>
      <li className={styles.Feature}>
        Has optimized production build via Terser
      </li>
      <li className={styles.Feature}>
        Transforms images into sprite and use them as component
      </li>
      <li className={styles.Feature}>
        Has build-in component for rendering svg icons
      </li>
      <li className={styles.Feature}>
        Has many eslint rules which take care of code syntax quality
      </li>
      <li className={styles.Feature}>Has Prettier support out of the box</li>
      <li className={styles.Feature}>
        Ships with tests environment based on Jest and Enzyme
      </li>
      <li className={styles.Feature}>
        Automatically generates manifest.json along with favicons for all
        environments
      </li>
    </ul>
  </main>
);

export default App;
