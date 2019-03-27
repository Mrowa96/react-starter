# React Boilerplate

### Features:

- Uses React library as a base
- Enables newest CSS syntax and features via PostCSS with modules
- Enables newest JavaScript syntax and features via Babel
- Extends JavaScript syntax with types from Flow
- Has optimized production build via Terser
- Transforms images into sprite and use them as component
- Has build-in component for rendering svg icons
- Has many eslint rules which take care of code syntax quality
- Has Prettier support out of the box
- Ships with tests environment based on Jest and Enzyme
- Automatically generates manifest.json along with favicons for all environments

### What to do in the future:

- add serviceworker?

### Additional info:

React, ract-dom and prettier should have exact version of packages
If flow throws error about missing package run `./node_modules/.bin/flow-typed install`
Tests have to have suffix `.test` in order to eslint lint them correctly (eslint-plugin-enzyme foult)
