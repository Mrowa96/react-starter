import React from 'react';
import Button from '@/components/Button';
import SvgIcon from '@/components/SvgIcon';
import styles from './App.styles.scss';

const onClick = (): void => {
  // eslint-disable-next-line no-alert
  alert('Oh.. You clicked me! ');
};

export default function App(): JSX.Element {
  return (
    <main className={styles.Wrapper}>
      <h1 className={styles.Title}>
        <img src='/images/logo.png' alt='React logo' width='50' />
        React boilerplate
      </h1>

      <SvgIcon name='info' width={36} />

      <ul className={styles.FeatureList}>
        <li className={styles.Feature}>Uses React library as a base</li>
        <li className={styles.Feature}>
          Enables SASS support which could be enhanced by PostCSS plugins. Autoprefixer plugin is enabled by default
        </li>
        <li className={styles.Feature}>Provides types support via TypeScript</li>
        <li className={styles.Feature}>Has optimized production build via Terser</li>
        <li className={styles.Feature}>Has build-in component for rendering svg icons</li>
        <li className={styles.Feature}>Has many lint rules which take care of code syntax quality</li>
        <li className={styles.Feature}>Has Prettier support out of the box</li>
        <li className={styles.Feature}>Ships with tests environment based on Jest and react-testing-library</li>
        <li className={styles.Feature}>
          Automatically generates manifest.json along with favicons for all environments
        </li>
      </ul>

      <Button onClick={onClick}>Click me</Button>
    </main>
  );
}
