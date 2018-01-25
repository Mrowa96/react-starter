const gulp = require('gulp');
const env = require('gulp-environments');

const tasks = {
    fonts: require('./src/build/tasks/fonts'),
    styles: require('./src/build/tasks/styles'),
    images: require('./src/build/tasks/images'),
    scripts: {
        esNext: require('./src/build/tasks/scripts-es-next')
    },
    sprites: require('./src/build/tasks/sprites'),
    templates: {
        twig: require('./src/build/tasks/templates-twig')
    },
    browserSync: require('./src/build/tasks/browser-sync'),
};
const sources = {
    fonts: [
        './node_modules/font-awesome/fonts/**.*'
    ],
    styles: './src/assets/styles/**/*.scss',
    scripts: './src/assets/scripts/app.js',
    images: './src/assets/images/*.*',
    sprites: './src/assets/images/sprites/*.{png,jpg}',
    templates: {
        all: 'src/templates/**/*.twig',
        pages: './src/templates/page/*.twig'
    }
};

/**
 * Copy external fonts from e.g. node_modules.
 */
gulp.task('fonts', () => tasks.fonts(sources.fonts));

/**
 * Copy images from main image directory. NOT handle images in subdirectories.
 */
gulp.task('images', () => tasks.images(sources.images));

/**
 * Handle styles, but first handle all dependencies e.g. icons, sprites and others.
 */
gulp.task('styles-with-dependencies', ['sprites'], () => tasks.styles(sources.styles));

/**
 * Handle styles with one specific dependency. In that case - sprites.
 */
gulp.task('styles-with-sprites', ['sprites'], () => tasks.styles(sources.styles));

/**
 * Dependency free styles task.
 */
gulp.task('styles', () => tasks.styles(sources.styles));

/**
 * Run transpiler on javascript code and save output in ES5 format.
 */
gulp.task('scripts', () => tasks.scripts.esNext(sources.scripts));

/**
 * Get all files in sprites directory, and output one sprites.png file.
 */
gulp.task('sprites', () => tasks.sprites(sources.sprites));

/**
 * Handle templates, and outputs raw html.
 */
gulp.task('templates', () => tasks.templates.twig(sources.templates.pages));

/**
 * DEVELOPMENT. Syncs browser with current code.
 */
gulp.task('browser-sync', tasks.browserSync);

/**
 * DEVELOPMENT. Watch files on changes.
 */
gulp.task('watch', () => {
    gulp.watch(sources.styles, ['styles']);
    gulp.watch(sources.sprites, ['styles-with-sprites']);
    gulp.watch(sources.images, ['images']);
    gulp.watch(sources.templates.all, ['templates']);
});

if (env.development()) {
    gulp.task('default', [
        'fonts',
        'styles-with-dependencies',
        'scripts',
        'images',
        'templates',
        'browser-sync',
        'watch'
    ]);
} else {
    gulp.task('default', [
        'fonts',
        'styles-with-dependencies',
        'scripts',
        'images',
        'templates'
    ]);
}
