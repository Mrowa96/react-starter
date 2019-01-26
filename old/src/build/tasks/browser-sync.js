const browserSync = require('browser-sync');

module.exports = () => {
    return browserSync({
        server: {
            baseDir: './dist'
        },
        open: 'external',
        notify: false
    });
};