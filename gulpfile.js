import gulp from "gulp";
import { path, preprocessor } from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	preprocessor: preprocessor,
	gulp: gulp,
	plugins: plugins
}

import { copy, copyActions, copyImgcontent, copyPages } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { sprite } from "./gulp/tasks/sprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Наглядас
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.actions, copyActions);
	gulp.watch(path.watch.imgcontent, copyImgcontent);
	gulp.watch(path.watch.pages, copyPages);
	gulp.watch(path.watch.html, html); //gulp.series(html, ftp)
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.js);
	gulp.watch(path.watch.images, images);
}

// Опрацювання шрифтів
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);


// Основні завдання
const mainTasks = gulp.series(fonts, gulp.parallel(copy, copyImgcontent, copyPages, copyActions, html, scss, js, images));


// Сценарії виконання завдань
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Експорт сценаріїв
export { sprite }
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Виконання сценарію по дефолту 
gulp.task('default', dev);