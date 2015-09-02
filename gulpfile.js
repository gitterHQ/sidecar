var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var gzip = require('gulp-gzip');
var S3 = require('s3');
var manifest = require('./package.json');


// Default Task
gulp.task('default', ['build-dev']);


// Development build
gulp.task('build-dev', ['webpack:build-dev'], function() {
  gulp.watch(['src/**/*'], ['webpack:build-dev']);
});

gulp.task('webpack:build-dev', function(callback) {
  // modify some webpack config options
  var myDevConfig = Object.create(webpackConfig);
  myDevConfig.devtool = 'sourcemap';
  myDevConfig.debug = true;
  
  // create a single instance of the compiler to allow caching
  var devCompiler = webpack(myDevConfig);

  // run webpack
  devCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true
    }));
    callback();
  });
});


// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', function(callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));
    callback();
  });
});


// Deployment tasks

gulp.task('compress', ['webpack:build'], function() {
  return gulp.src(['dist/**/*.{css,js,ttf,svg}'], { base: 'dist/' })
    .pipe(gzip({ append: true, gzipOptions: { level: 9 } }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('release', ['compress'], function(done) {
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
