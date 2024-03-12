import 'esm';
import gulp from 'gulp';
import sassFactory from 'gulp-sass';
import * as sass from 'sass';
import fs from 'fs/promises';


const sassFn = sassFactory(sass);

// Dynamically import modules
const autoprefixer = (await import('gulp-autoprefixer')).default;
const cleanCSS = (await import('gulp-clean-css')).default;
const header = (await import('gulp-header')).default;
const merge = (await import('merge-stream')).default;
const plumber = (await import('gulp-plumber')).default;
const rename = (await import('gulp-rename')).default;
const uglify = (await import('gulp-uglify')).default;
const execa = (await import('execa')).default;

// Load del module and package.json
const del = (await import('del')).default;
const pkgData = await fs.readFile(new URL('./package.json', import.meta.url));
const pkg = JSON.parse(pkgData);

const banner = `/*!
* Project Name: ${pkg.name}
* Author: ${pkg.author}
* Description: ${pkg.description}
* Version: ${pkg.version}
* License: ${pkg.license}
*/\n`;

// BrowserSync function
function browserSync(done) {
  execa('browser-sync', ['start', '--server', '--files', '*.*'], {
    stdio: 'inherit',
  }).then(() => {
    done();
  });
}

// BrowserSync reload function
function browserSyncReload(done) {
  execa('browser-sync', ['reload'], {
    stdio: 'inherit',
  }).then(() => {
    done();
  });
}

// Dynamic import of del corrected
async function clean() {
  const delModule = await import('del');
  return delModule.deleteSync(["./vendor/"]);
}

// Modules & Vendors
function modules(done) {
  // Define module imports here
  done();
}

// CSS task
function css() {
  return gulp.src("./src/app/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sassFn().on("error", sassFn.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(header(banner, { pkg })) // Ensure 'banner' and 'pkg' are defined
    .pipe(gulp.dest("./src/app/css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./src/app/css"))
    //.pipe(bs.stream());
}

// JS task
function js() {
  return gulp.src(['./src/app/js/*.js', '!./src/app/js/*.min.js'])
    .pipe(uglify())
    .pipe(header(banner, { pkg }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./src/app/js'))
    //.pipe(bs.stream());
}


// Watch files
function watchFiles() {
  gulp.watch("./src/app/scss/**/*", css);
  gulp.watch(["./src/app/js/**/*", "!./src/app/js/**/*.min.js"], js);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor, gulp.parallel(css, js));
const watch = gulp.parallel(watchFiles, browserSync);

export default build;

// Export tasks
export { css, js, clean, vendor, build, watch };
