import gulp from "gulp";
import { path } from "./core.js";
import { plugins } from "./core.js";

global.appGulp = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

import { copy } from "./core.js";
import { cleaning } from "./core.js";
import { html } from "./core.js";
import { liveServer } from "./core.js";
import { scss } from "./core.js";
import { js } from "./core.js";
import { images } from "./core.js";
import { zip } from "./core.js";

function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
}

const tasks = gulp.parallel(copy, html, scss, js, images);

const dev = gulp.series(cleaning, tasks, gulp.parallel(watcher, liveServer));
const build = gulp.series(cleaning, tasks);
const zipDeploy = gulp.series(cleaning, tasks, zip);

export { dev }
export { build }
export { zipDeploy }

gulp.task('default', dev);