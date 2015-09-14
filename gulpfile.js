var gulp = require('gulp');

var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var del = require('del');
var Promise = require('bluebird');
var argv = require('yargs').argv;

var path = require('path');

var webpack = require('webpack');
var gzip = require('gulp-gzip');
var S3 = require('s3');
var manifest = require('./package.json');

var postcss = require('gulp-postcss');
var getPostcssPluginStack = require('./postcss-plugin-stack');


var sidecarWebpackConfig = require('./webpack.config');
var micrositeWebpackConfig = require('./microsite/webpack.config');
var micrositeProductionWebpackConfig = require('./microsite/webpack.production.config');


var micrositeBasePath = './microsite/';
var config = {
  paths: {
    micrositeTemplates: {
      src: path.join(micrositeBasePath, 'src/index.html'),
      dist: path.join(micrositeBasePath, 'dist/'),
      watch: {
        tasks: 'build-microsite-templates',
        globs: path.join(micrositeBasePath, 'src/index.html')
      }
    },
    micrositeCss: {
      src: path.join(micrositeBasePath, 'src/css/all.css'),
      dist: path.join(micrositeBasePath, 'dist/css'),
      watch: {
        tasks: 'build-microsite-styles',
        globs: path.join(micrositeBasePath, 'src/css/**/*')
      }
    },
    micrositeScripts: {
      watch: {
        tasks: 'build-microsite-scripts',
        globs: path.join(micrositeBasePath, 'src/js/**/*')
      }
    },
    micrositeImages: {
      src: path.join(micrositeBasePath, 'src/images/**/*'),
      dist: path.join(micrositeBasePath, 'dist/images/'),
      watch: {
        tasks: 'move-microsite-images',
        globs: path.join(micrositeBasePath, 'src/images/**/*')
      }
    }
  }
};




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




var plumberErrorHandler = function(err) {
  console.log('Plumber caught error:');
  console.log(err.msg, err.stack);
  this.emit('end');
};

// Clears the distribution folder before running the other tasks
gulp.task('microsite-build-clean', function() {
  return del([path.join(micrositeBasePath, 'dist')]);
});

// Move the templates into dist
gulp.task('build-microsite-templates', function() {
  return gulp.src(config.paths.micrositeTemplates.src)
    .pipe(gulp.dest(config.paths.micrositeTemplates.dist));
});

// Move the images into dist
gulp.task('move-microsite-images', function() {
  return gulp.src(config.paths.micrositeImages.src)
    .pipe(gulp.dest(config.paths.micrositeImages.dist));
});

gulp.task('build-microsite-styles', function() {
  return gulp.src(config.paths.micrositeCss.src)
    .pipe(plumber({
      errorHandler: plumberErrorHandler
    }))
    .pipe(postcss(getPostcssPluginStack()))
    .pipe(gulp.dest(config.paths.micrositeCss.dist));
});

gulp.task('build-microsite-scripts', function() {
  //var compiler = webpack(micrositeWebpackConfig);
  //var watch = Promise.promisify(compiler.watch);

  return Promise.promisify(webpack)(argv.dev ? micrositeWebpackConfig : micrositeProductionWebpackConfig)
    .then(function(stats) {
      /* * /
      gutil.log('[webpack]', stats.toString({
        colors: true
      }));
      /* */
    })
    .catch(function(err) {
      if(err) {
        throw new gutil.PluginError('webpack', err);
      }
    });
});



// Rerun tasks when a file changes
gulp.task('watch', function() {
  Object.keys(config.paths).forEach(function(key) {
    var entry = config.paths[key];

    var watchConfig = entry.watch;
    if(watchConfig) {
      gulp.watch(watchConfig.globs, [].concat(watchConfig.tasks));
    }
  });
});





gulp.task('build-microsite', function(callback) {
  runSequence(
    ['microsite-build-clean'],
    ['build-microsite-templates', 'build-microsite-styles', 'build-microsite-scripts', 'move-microsite-images'],
    callback
  );
});

gulp.task('deploy', function(callback) {
  runSequence(
    ['compress_assets', 'upload_to_s3'],
    callback
  );
});

// Default Task
gulp.task('default', function(callback) {
  runSequence(
    ['build-microsite'],
    ['watch'],
    callback
  );
});


