import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";
export const sprite = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    // Сворення сторінки з переліком піктограм
                    example: true
                }
            },
        }
        ))
        .pipe(app.gulp.dest(`${app.path.build.images}`));
}
