import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const app: HTMLElement | null = document.getElementById('app');

if (!app) {
  throw new Error('App container does not exists!');
}

ReactDOM.render(<App />, app);
