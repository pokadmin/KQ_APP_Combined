const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/src/app.js', 'public/js')
    .react()
  /*   .sourceMaps()
    .webpackConfig({
        devtool: 'inline-source-map',
    }) */
    .sass('resources/sass/app.scss', 'public/css')
    /* .setResourceRoot("/KQ/knowledge-quotient/public"); // localhost */
   .setResourceRoot("/pub/qz/public"); // server
