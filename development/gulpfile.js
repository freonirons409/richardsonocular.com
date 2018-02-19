// Load plugins
var gulp = require('gulp'),
sass = require('gulp-sass'),
minifyCss = require('gulp-clean-css'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('autoprefixer'),
rename = require('gulp-rename'),
notify = require('gulp-notify'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
plumber = require('gulp-plumber'),
gutil = require('gulp-util'),
newer = require('gulp-newer'),
imagemin = require('gulp-imagemin'),
del = require('del'),
gzip = require('gulp-gzip'),
preprocess = require('gulp-preprocess'),
zip = require('gulp-zip'),
fs = require('fs'),
iconfont = require('gulp-iconfont'),
fileinclude = require('gulp-file-include'),
iconfontCss = require('gulp-iconfont-css'),
merge = require('merge-stream'),
mustache = require("gulp-mustache"),
browserSync = require('browser-sync').create(),
splitFiles = require("gulp-split-files"),
runSequence = require('run-sequence');
map = require("map-stream"),
postcss = require('gulp-postcss'),
pxtorem = require('postcss-pxtorem'),
htmlmin = require('gulp-htmlmin'),
pkg = require('./package.json');

// error function for plumber
var onError = function (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};

function logMatches(regex) {
    var prevFileName ="";
  return map(function(file, done) {
    if(file.contents.toString().match(regex)){
        file.contents.toString().match(regex).forEach(function(match) {
            var fileName = file.path.split('/').pop().split('\\').pop();
            if(fileName != prevFileName) {
                console.log("  ");
                console.log(fileName);
                console.log("========================");
            }
            console.log("\""+match.replace("data-content-block=\"","").replace("\"","")+"\",");
          prevFileName = fileName;
        });
    }
    done(null, file);
  });
}

gulp.task('content-areas', function () {
    var searchString = new RegExp(/data\-content\-block\=\"[a-zA-Z0-9\-\_\.]*\"/);
    return gulp.src('./src/*.html')
    .pipe(logMatches(/data\-content\-block\=\"[a-zA-Z0-9\-\_\.]*\"/g));
});

// Mustache Task
gulp.task('mustache', function() {
    gulp.src("src/templates/*.mustache")
    .pipe(mustache({}, { extension: '.html' }))
    .pipe(preprocess({context: { NODE_ENV: 'dev', DEBUG: true}}))
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(gulp.dest("./src"));
    browserSync.reload();
});

// ==========================================================
// convert pixels to rem
// ==========================================================
var remOptions = {
            rootValue: 16,
            //unitPrecision: 5,
            replace: true,
            map: true,
            propList: ['*'],
            //selectorBlackList: [],
            mediaQuery: true,
            minPixelValue: 1
        };
gulp.task('px-rem', function() {
    var processors = [
        autoprefixer({
            browsers: 'last 1 version'
        }),
        pxtorem(remOptions)
    ];
 
    return gulp.src(['./deploy/css/*.css'])
        .pipe(postcss(processors))
        .pipe(gulp.dest('./deploy/css/'))
        .on("error", function(err){ console.log(err); });
});
gulp.task('local-px-rem',['styles'], function() {
    var processors = [
        autoprefixer({
            browsers: 'last 1 version'
        }),
        pxtorem(remOptions)
    ];
    console.log("Running PX to REM conversion..."); 
 
    return gulp.src(['./src/assets/css/*.css'])
        .pipe(postcss(processors))
        .pipe(gulp.dest('./src/assets/css/'))
        .on("error", function(err){ console.log(err); });
});


// ============= Iconfont ============= //
var fontName = 'Icons';
gulp.task('iconfont', ['make-iconcss'], function(){
    browserSync.reload();
});

gulp.task('make-iconfont', function(cb) {
    return gulp.src(['src/iconfont-svgs/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            fontPath: '/assets/font/',
            targetPath: '/../../../src/scss/icons.scss'
        }))

        .pipe(iconfont({
            fontName: fontName,
            fontHeight: 1000,
            appendCodepoints: true,
            normalize: true,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
        }))
        .pipe(gulp.dest('./src/assets/font/'));

});

gulp.task('make-iconcss',['make-iconfont'], function(cb) {
    return gulp.src('./src/scss/icons.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./src/iconfont/'));
});

// ============= End Iconfont ============= //

// ============= Styles ============= //
gulp.task('styles', function(cb) {
    return gulp.src('./src/scss/main.scss')
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./maps', { // use '.' to write the sourcemap to a separate file in the same dir
            sourceRoot: './' // use the file's folder as source root
        }))
        .pipe(gulp.dest('./src/assets/css/'))
        .pipe(browserSync.stream({match: './src/assets/css/*.css'}));
});
// gulp.task('calculators', function(cb) {
//     runSequence('clear-calculators','calculator-split','calculator-clean');
// });
gulp.task('calculator-split', function(cb) {
    console.log("Splitting main.min into two files for calculators.");
    return gulp.src("./src/assets/css/main.min.css")
        .pipe(splitFiles())
        //.pipe(rename('KJESiteSpecific.css'))
        .pipe(gulp.dest("./src/root/files/css/"));
        //.pipe(gulp.dest("./deploy/css/"));
});
gulp.task('calculator-clean', function() {
    //console.log("Removed decoy files...");
    return del(['./src/root/files/css/main.min-2.css']),
    del(['./src/root/files/css/decoy.css']);
});
gulp.task('calculator-clear', function(){
    //console.log("Clearing calc files");
    return del(['./deploy/css/KJESiteSpecific.css']);
    del(['./src/root/files/css/KJESiteSpecific.css']);
});

// ============= Scripts ============= //
gulp.task('js', function(cb) {
    var scripts = gulp.src(['./src/scripts/bootstrap/collapse.js',
                            './src/scripts/bootstrap/dropdown.js',
                            './src/scripts/bootstrap/modal.js',
                            './src/scripts/bootstrap/affix.js',
                            './src/scripts/bootstrap/tab.js',
                            './src/scripts/bootstrap/transition.js',
                            './src/scripts/plugins/*.js',
                            './src/scripts/lib/modernizr.custom.80639.js',
                            './src/scripts/script.js'])
        .pipe(newer('script.min.js'))
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(gulp.dest('./src/assets/js/'))

    var jquery = gulp.src('./src/scripts/lib/jquery-1.10.1.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./src/assets/js/'))

    var polyfill = gulp.src('./src/scripts/lib/polyfills.min.js')
        .pipe(gulp.dest('./src/assets/js/'))

    var html5shiv = gulp.src('./src/scripts/lib/html5shiv.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(gulp.dest('./src/assets/js/'))
        //.pipe(notify({ message: 'Styles task complete' })); // Uncomment if you want notified when task is completed

    return merge(scripts, jquery, polyfill, html5shiv)
});



// ============= Images ============= //

var imgSrc = './src/images/**/*.{gif,jpg,png,svg,mov,webm,ogv,avi,mp4}';
var imgDest = './src/assets/img/';

gulp.task('images', function(cb) {
    var images = gulp.src(imgSrc)
        .pipe(newer(imgDest))
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
        }))
        .pipe(gulp.dest(imgDest))

    var icons = gulp.src('./src/root/icons/*')
        .pipe(gulp.dest('./src/assets/root'))

    var videos = gulp.src('./src/images/**/*.{mov,webm,ogv,avi,mp4}').pipe(gulp.dest('./src/assets/img/'));

    return merge(images, icons, videos)
});


// function to copy the npm installed plugins to the assets directory so that they can be updated and 
// installed on each project install
// =====================================================================
gulp.task('plugins', function() {
   gulp.src('./node_modules/parsleyjs/dist/parsley.js').pipe(gulp.dest('./src/scripts/plugins/'));
   gulp.src('./node_modules/slick-carousel/slick/slick.js').pipe(gulp.dest('./src/scripts/plugins/'));
   gulp.src('./node_modules/bootstrap-sass/assets/javascripts/bootstrap/*.js').pipe(gulp.dest('./src/scripts/bootstrap/'));
});
// =====================================================================


// ============= Fonts ============= //
gulp.task('fonts', function(cb) {
    // return gulp.src('./node_modules/fonts/'+ pkg.baseFont +'/*')
    //     .pipe(gulp.dest('./src/assets/font/'))
    // If alternate font is used, uncomment below and comment above
    var main = gulp.src('./node_modules/fonts/'+ pkg.baseFont +'/*')
      .pipe(gulp.dest('./src/assets/font/'))

    var alt = gulp.src('./node_modules/fonts/'+ pkg.altFont +'/*')
      .pipe(gulp.dest('./src/assets/font/'))

    return merge(main, alt);
});

// ============= Copy ============= //
gulp.task('copy', function(cb) {
    var copyCss = gulp.src('./src/root/files/css/*.css')
        .pipe(gulp.dest('./src/assets/css/'))
    var copyMedia = gulp.src('./src/root/files/media/*.html')
        .pipe(gulp.dest('./src/assets/media/'))
    var copyJS = gulp.src(['./src/root/files/js/*.js', ])
        .pipe(gulp.dest('./src/assets/js/'))
    var copyTxt = gulp.src(['./src/root/*.txt', ])
        .pipe(gulp.dest('./src/assets/root/'))
        .pipe(notify({ message: 'Copy task complete' }))
    var copyFont = gulp.src(['./src/root/files/font/*'])
        .pipe(gulp.dest('./src/assets/font/'));

    return merge(copyCss, copyMedia, copyJS, copyTxt, copyFont)
});

// ============= Deploy ============= //
// styles, js, copy, images will run before this task is run //
gulp.task('deploy', function(cb) {
    del(['deploy/'+ pkg.zip +'.zip']);
    //del(['deploy/**']);

    var assets = gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./deploy/'))

    var templates = gulp.src(['./src/templates/**/*.mustache'])
        .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}}))
        .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true, minifyJS: true}))
        .pipe(gulp.dest('./deploy/templates/'))

    var images = gulp.src(['./src/templates/images/**.png'])
        .pipe(gulp.dest('./deploy/templates/'))

    return merge(assets, templates, images)

});
// ============= Compress ============= //
gulp.task('compress', function(cb) {
    var minify = gulp.src('./deploy/css/main.min.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./deploy/css'));

    var css = gulp.src('./deploy/css/*.css' )
        .pipe(gzip())
        .pipe(gulp.dest('./deploy/css'));

    var js = gulp.src('./deploy/js/*.js' )
        .pipe(gzip())
        .pipe(gulp.dest('./deploy/js'));

    var svg = gulp.src('./deploy/img/*.svg' )
        .pipe(gzip())
        .pipe(gulp.dest('./deploy/img'));

    var theme = gulp.src('./deploy/**/*')
        .pipe(zip(pkg.zip +'.zip'))
        .pipe(gulp.dest('./deploy'));

    return merge(minify, css, js, svg, theme)
})

// ============= Clean Files ============= //
gulp.task('clean', function(cb) {
    return del(['src/assets/css', 'src/assets/media', 'src/assets/js', 'src/assets/img', 'src/assets/root', 'src/assets/font', 'deploy'], cb)
});

gulp.task('clear', function (done) {
    return cache.clearAll(done);
});

gulp.task('watch', ['mustache', 'local-px-rem'], function() {

    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: "./src/",
            index: "home.html"
        },
        // Need to update this to include css files to inject i think
        files: ['./src/*.html', './src/assets/css/*.css', './src/assets/js/*.js', './src/assets/img/*.{gif,jpg,png,svg}']
    });
    // HTML Files
    gulp.watch("./src/*.html");
    // Mustache Files
    gulp.watch(["./src/templates/**/*.mustache"], ['mustache']);
    //SVG Icon files
    gulp.watch(["./src/iconfont-svgs/*.svg"], ['make-iconfont']);
    // SASS Files
    gulp.watch(["./src/scss/**/*.scss"], ['local-px-rem']);
    // Javascript Files
    gulp.watch(["./src/scripts/**/*.js"], ['js']);
    // Image Files
    gulp.watch(["./src/images/**/*", "! ./src/images/sprites/" ], ['images']);

    // Sprites
    //gulp.watch(["./src/images/sprites/*-2x.png" ], ['sprite']);
});


gulp.task('default', function(){
    runSequence(
        'plugins',
        'styles', 
        'js',
        'calculator-clear',
        'calculator-split',
        'calculator-clean', 
        'copy', 
        'images', 
        'fonts',
        'make-iconfont',
        'deploy',
        'px-rem',
        'compress'
    );
});
