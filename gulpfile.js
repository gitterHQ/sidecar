var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var gzip = require('gulp-gzip');
var S3 = require('s3');
var manifest = require('./package.json');

// Default Task
gulp.task('default', ['deploy']);
gulp.task('deploy', ['compress_assets', 'upload_to_s3']);

gulp.task('compress_assets', function() {
  return gulp.src(['dist/**/*.{css,js,ttf,svg}'], { base: 'dist/' })
    .pipe(gzip({ append: true, gzipOptions: { level: 9 } }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('upload_to_s3', ['compress_assets'], function(done) {
  var major = manifest.version.split('.')[0];

  var params = {
    localFile: './dist/sidecar.js.gz',
    s3Params: {
      Bucket: 'sidecar.gitter.im',
      Key: 'js/sidecar.v' + major + '.js',
      CacheControl: 'public, max-age=0, no-cache',
      ContentType: 'application/javascript',
      ContentEncoding: 'gzip',
      ACL: 'public-read'
    }
  };

  var S3Client = S3.createClient({
    s3Options: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET
    },
  });

  var uploader = S3Client.uploadFile(params);

  uploader.on('error', function (err) {
    gutil.log(err.stack);
    done(err);
  });

  uploader.on('end', function(metadata) {
    done();
  });
});
