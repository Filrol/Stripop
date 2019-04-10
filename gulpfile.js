// Philippe
var gulp = require('gulp');
// Sass/CSS stuff
var sass = require('gulp-sass');
var uglify = require('gulp-uglify'); //js
var concat = require('gulp-concat'); //js
var cssnano = require('gulp-cssnano'); //css
var postcss = require('gulp-postcss'); //css
var autoprefixer = require('autoprefixer'); //css
var discardcomments = require('postcss-discard-comments'); //css
var plumber = require('gulp-plumber'); //JS erreur ne bloque pas
var del = require('del'); // EFFACE
// var changed = require('gulp-changed'); // vérifie les fichiers modifiés
var runSequence = require('run-sequence'); // une tache avant l'autre



// MAIN COMMANDS
//
// watch (default) => Generate CSS & JS
// export => create final app (dist)






// var sassOptions = {
//   errLogToConsole: true
// };

// Variables de chemins
// var DEV = './stripop_dev'; // dossier de travail
// var PROD = './stripop_dist'; // dossier à livrer
var paths = {
  dev: 'stripop_dev', // dossier de dev
  dist: 'stripop_dist', // export
  dev_js_app: 'stripop_dev/js/app/**/*.js',
  dev_css: 'stripop_dev/css/*.css',
  dev_sass: 'stripop_dev/css/sass/**/*.+(css|scss)',
  // imgSrc: 'stripop_dev/img/**/*',
  // imgdist: 'stripop_dist/img',
  // htmlSources : '**/*.html'
};




//CSS
  // (pris sur initial media)
  var postcss_plugins = [
  autoprefixer({
    browsers : ['> 3%']
  }),
  discardcomments(),
  cssnano(),
  ];


// Génère un fichier CSS unique (dans DEV)
gulp.task('sass', function() {
  return gulp.src(paths.dev_sass)
  .pipe(plumber({
    errorHandler: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(sass())
  .pipe(concat('stripop_app.css'))
  .pipe(gulp.dest(paths.dev + '/css'))
});
// Export vers DIST + minify
gulp.task('css_export', function(){
  return gulp.src(paths.dev_css)
  .pipe(plumber({
    errorHandler: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(cssnano())
  .pipe(plumber.stop())
  .pipe(gulp.dest(paths.dist + '/css'))
    // .pipe(browserSync.reload({
    //   stream: true
    // }))
  });


//JS
  // Génère un fichier JS unique (dans DEV)
  gulp.task('js', function() {
    return gulp.src(paths.dev_js_app)
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('stripop_app.js'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.dev + '/js'))
  });

// Export vers DIST + minify
gulp.task('js_export', function() {
  return gulp.src(paths.dev + '/js/*.js')
  .pipe(plumber({
    errorHandler: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
    .pipe(uglify())// réduction du JS, attention bug!
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.dist + '/js'))
  });




//copie DEV => DIST


gulp.task('copie_html', function() {
  return gulp    .src(paths.dev + "/index.html")
  .pipe(gulp.dest(paths.dist));
});
gulp.task('copie_audio', function() {
  return gulp.src(paths.dev + '/audio/**/*')
  .pipe(gulp.dest(paths.dist + '/audio'))
})
gulp.task('copie_fonts', function() {
  return gulp.src(paths.dev + '/fonts/**/*')
  .pipe(gulp.dest(paths.dist + '/fonts'))
})
gulp.task('copie_img', function() {
  return gulp.src(paths.dev + '/img/**/*')
  .pipe(gulp.dest(paths.dist + '/img'))
})
gulp.task('copie_vendor', function() {
  return gulp.src(paths.dev + '/vendor/**/*')
  .pipe(gulp.dest(paths.dist + '/vendor'))
})


// nettoyer "/stripop_dist"
gulp.task('clean', function(){

  return del(paths.dist + '/**');

});


gulp.task('copie_all', ['copie_html','copie_audio','copie_fonts','copie_img','copie_vendor']);





/* automatisation */
// gulp.task('watch', ['browserSync','sass'], function(){
//   gulp.watch('app/sass/**/*.scss', ['sass'])
//   gulp.watch('app/*.+(html|htm)').on('change', browserSync.reload);
// })

// Génére les fichier JS et CSS dans DEV
gulp.task('watch', function(){
  gulp.watch( paths.dev_sass, { interval: 1000 }, ['sass']);
  gulp.watch( paths.dev_js_app, { interval: 1000 }, ['js']);
});

// Génére l'appli dans DIST (+concat)
gulp.task('watch&export', function(){
  gulp.watch( paths.dev_sass, { interval: 1000 }, ['export']);
  gulp.watch( paths.dev_js_app, { interval: 1000 }, ['export']);
});





//PROCESS

// Tâche par défaut
gulp.task('default', ['watch']);

// export
// gulp.task('export', ['copie_all', 'sass', 'css_export', 'js', 'js_export'])
gulp.task('export', function(callback) {
  runSequence('clean','copie_all',['sass', 'js'],['css_export', 'js_export']);
});


