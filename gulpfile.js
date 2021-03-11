const { src, dest, watch, parallel, series } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const del = require('del');


function build_html() {
    return src([
        //'',
        'app/**/*.html'
    ])
    .pipe(htmlmin({ 
        collapseWhitespace: true,
        removeComments : true 
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

function build_php() {
    return src([
        'app/**/*.php'
    ])
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

function build_other() {
    return src([
        'app/*.png',
        'app/favicon.ico',
        'app/site.webmanifest',
        'app/**/*.php'
    ])
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

function build_css() {
    return src('app/scss/**/*.scss')
    //.pipe(sourcemaps.init())
    .pipe(concat('styles.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
    .pipe(sass({outputStyle: 'compressed'})) 
    //.pipe(sass({outputStyle: 'expanded'}))
    //.pipe(sourcemaps.write()) 
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
} 

function build_scripts() {
    return src([
        //'',
        'app/js/**/*.js'
    ])
    //.pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    //.pipe(sourcemaps.write()) 
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

function build_images() {
    return src('app/img/**/*')
    .pipe(imagemin([
        //imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 80, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream())
}

function build_webp() {
    return src('dist/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream())
}

function build_fonts() {
    return src('app/fonts/**/*')
    .pipe(dest('dist/fonts'))
    .pipe(browserSync.stream())
}

function watching() {
    watch(['app/**/*.html'],build_html).on('change',browserSync.reload);
    watch(['app/**/*.php'],build_php).on('change',browserSync.reload);
    watch(['app/scss/**/*.scss'],build_css);
    watch(['app/js/**/*.js'],build_scripts);
    watch(['app/img/**/*'],series(delImg,build_images));
    watch(['app/fonts/**/*'],series(delFonts,build_fonts));
}

function browser() {
    browserSync.init({
        server : {
            baseDir: 'dist/'
        },
        //browser: 'google chrome'
    });
}

function delDist() {
    return del('dist/*')
}

function delImg() {
    return del('dist/img')
}

function delFonts() {
    return del('dist/fonts')
}

exports.html = build_html;
exports.php = build_php;
exports.other = build_other;
exports.css = build_css;
exports.scripts = build_scripts;
exports.images = build_images;
exports.webp = build_webp;
exports.fonts = build_fonts;
exports.watching = watching;
exports.browser = browser;
exports.delDist = delDist;


exports.build = series(
    delDist,
    build_html,
    build_php,
    build_other,
    build_css,
    build_scripts,
    build_images,
    build_webp,
    build_fonts
);
exports.dev = series(
    delDist,
    build_html,
    build_php,
    build_other, 
    build_css, 
    build_scripts, 
    build_images, 
    build_webp, 
    build_fonts, 
    parallel(browser, watching)
);
//exports.default = parallel();