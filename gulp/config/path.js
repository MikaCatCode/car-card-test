import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = 'prod-' + rootFolder;
const srcFolder = `./src`;
const wpFolder = `.`;

// sass, less, scss
export const preprocessor = 'scss';

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
		imgcontent: `${buildFolder}/img-content/`,
		pages: `${buildFolder}/pages/`,
		actions: `${buildFolder}/actions/`
	},
	src: {
		js: `${srcFolder}/js/script.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
		svg: `${srcFolder}/img/**/*.svg`,
		scss: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`, //.pug
		files: `${srcFolder}/files/**/*.*`,
		imgcontent: `${srcFolder}/img-content/**/*.*`,
		pages: `${srcFolder}/pages/**/*.*`,
		actions: `${srcFolder}/actions/**/*.*`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`, //.pug
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		files: `${srcFolder}/files/**/*.*`,
		imgcontent: `${srcFolder}/img-content/**/*.*`,
		pages: `${srcFolder}/pages/**/*.*`,
		actions: `${srcFolder}/actions/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}
