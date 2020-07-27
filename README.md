# React starter

## Features:

- Uses React library as a base
- Enables SASS support which could be enhanced by PostCSS plugins. Autoprefixer plugin is enabled by default.
- Provides types support via TypeScript
- Has optimized production build via Terser
- Has linters which will take care of scripts, styles and formatting mistakes
- Ships with tests environment based on Jest and react-testing-library
- Has build-in component for rendering svg icons
- Automatically generates favicons

## Information for developers

- In scripts you should import modules by `import xxx from @/xxx`. `@` is resolving to `src` directory.
- In styles you could import global styles by `@import 'xxx.scss';`. It will resolve to `src/styles` directory.
- When `NODE_ENV` will be equal to `development` only one favicon will be generated - for better performance.
- Component stories have to be placed in `ComponentName.stories.tsx` file.

### Recommended plugins to VSCode

- ESLint
- npm Intellisense
- Path Intellisense
- Prettier - Code formatter
- stylelint
- VisualStudio IntelliCode
- EJS language support

## TODO

- Handle svg in a better way
