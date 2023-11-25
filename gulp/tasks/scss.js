import dartSass from 'sass';
import gulpSass from 'gulp-sass';
//import dartScss from 'scss';
//import gulpScss from 'gulp-sass';
import gulpLess from 'gulp-less';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Стиснення CSS
import webpcss from 'gulp-webpcss'; // WEBP 
import autoprefixer from 'gulp-autoprefixer'; // Вендорні префікси
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групування медіа запитів

const sass = gulpSass(dartSass);
//const scss = gulpScss(dartScss);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true
            })
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss(
                    {
                        webpClass: ".webp",
                        noWebpClass: ".no-webp"
                    }
                )
            )
        )
        // Стиснений файл-дубль стилів
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}
