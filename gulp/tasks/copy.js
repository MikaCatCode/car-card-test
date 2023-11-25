export const copy = () => {
	return app.gulp.src(app.path.src.files)
		.pipe(app.gulp.dest(app.path.build.files))
}

export const copyActions = () => {
	return app.gulp.src(app.path.src.actions)
		.pipe(app.gulp.dest(app.path.build.actions))
}
export const copyImgcontent = () => {
	return app.gulp.src(app.path.src.imgcontent)
		.pipe(app.gulp.dest(app.path.build.imgcontent))
}
export const copyPages = () => {
	return app.gulp.src(app.path.src.pages)
		.pipe(app.gulp.dest(app.path.build.pages))
}
