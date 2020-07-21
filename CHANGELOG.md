# Version 0.3.0

- Add favicon along with favicons-webpack-plugin
- Use modules for css files
- Add CHANGELOG

# Version 0.4.0

- Add css optimizer
- Add env support
- Add app title from env
- Replace favicons-webpack-plugin with webapp-webpack-plugin due to vulnerabilities
- Add style normalizer
- Dir `dist` is now completly removed during build
- Add Button component

# Version 0.5.0

- Add flow
- Fix problems with line endings on Windows
- Extends eslint rules
- Rewrite component files names

# Version 0.6.0

- Add SvgIcon component
- Add SpriteIcon component along with auto-transform png's to sprite
- Add .eslintignore file
- Add flow-typed
- Enable dynamic import ES proposal

# Version 0.9.0

- Add tests with test environment
- Add a11y eslint rules
- Update React to 16.8.1
- If sprite won't be found SpriteIcon component will return null
- If svg won't be found SvgIcon will render message that svg doesn't exist.
- Change webpack output to more minimal version

# Version 2.0.0

- New homepage
- Add postcss-import for custom media support
- Add APP_DESCRIPTION to .env.dist
- README update
- Remove unnecessary assets

# Version 2.1.0

- Enable postcss color function
- Update react to v16.8.2
- Enable eslint hooks rules
- Fix SvgIcon display problem

# Version 2.2.0

- Rebranding to React boilerplate
- Packages update
- Add more flow typings
- Redirect everything to index in development web server

# Version 3.0.0

- Packages update
- Replace Flow with TypeScript
- Remove support for sprites, because it was usless
- Replace enzyme with react-testing-library
- Add new scripts for npm
- Fix postcss bug which reavel in missing variable fallback for older browsers
- Remove web archive entries from robots.txt

# Version 3.1.0

- Packages update
- Change order of css dependencies
- Remove few usless favicons (could be enable again anytime)

# Version 3.2.0

- Packages update
- Remove postcss custom-properties and color function

# Version 4.0.0

- Complete rewrite
- Remove babel dependencies
- Add storybook
- Add new scripts
