import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
	// .otf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		// Конвертація в .ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Завантажуємо у папку 
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}
export const ttfToWoff = () => {
	// .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		// Конвертація в .woff
		//.pipe(fonter({
		//	formats: ['woff']
		//}))
		.pipe(ttf2woff())
		// Завантажуємо в папку
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// .ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		// Конвертація в .woff2
		.pipe(ttf2woff2())
		// Завантажуємо в папку
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}
export const fontsStyle = () => {
	// Файл, в який будемо писати
	let fontsFile = `${app.path.srcFolder}/scss/base/_fonts.scss`;
	// Чи існує файл
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Чи існує файл
			if (!fs.existsSync(fontsFile)) {
				// Створюємо файл
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Запис у файл
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						let fontStyle = 'normal';
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else if (fontWeight.toLowerCase() === 'italic') {
							fontWeight = 400;
							fontStyle = 'italic';
						} else if (fontWeight.toLowerCase() === 'mediumitalic') {
							fontWeight = 500;
							fontStyle = 'italic';
						} else if (fontWeight.toLowerCase() === 'regularitalic') {
							fontWeight = 400;
							fontStyle = 'italic';
						} else if (fontWeight.toLowerCase() === 'bolditalic') {
							fontWeight = 700;
							fontStyle = 'italic';
						} else if (fontWeight.toLowerCase() === 'semibolditalic') {
							fontWeight = 600;
							fontStyle = 'italic';
						} else if (fontWeight.toLowerCase() === 'lightitalic') {
							fontWeight = 300;
							fontStyle = 'italic';
						} else if (fontWeight.toLowerCase() === 'thinitalic') {
							fontWeight = 100;
							fontStyle = 'italic';
						} else if (fontWeight.toLowerCase() === 'extralightitalic') {
							fontWeight = 200;
							fontStyle = 'italic';
						} else if (fontWeight.toLowerCase() === 'blackitalic') {
							fontWeight = 900;
							fontStyle = 'italic';
						} else if (fontWeight.toLowerCase() === 'extrabolditalic' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
							fontStyle = 'italic';
						} else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile,
							`@include font("${fontName}", "${fontFileName}", "${fontWeight}", "${fontStyle}");\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Якщо файл існує
				console.log("Файл scss/_fonts.scss уже є. Для оновлення - видаліть його. Буде створений новий файл.");
			}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
}
