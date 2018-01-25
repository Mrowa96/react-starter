const browserSync = require('browser-sync');

module.exports = function () {
    return browserSync({
        server: {
            baseDir: './dist'
        },
        open: 'external',
        notify: false
    });
};