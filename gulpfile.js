var gulp = require('gulp');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
const { exit } = require('yargs');

gulp.task('nodemon', (cb) => {
  let started = false;

  return nodemon({
    script: 'app.js'
  })
    .on('start', () => {
      if (!started) {
        started = true;
        return cb();
      }
    })
    .on('restart', () => {
      console.log('restarting');
    });

});

gulp.task('test', gulp.series('nodemon', function(done) {
  return gulp.src('app/test/*.js')
    .pipe(mocha({reporter: 'spec' , timeout:10000}));
}));
