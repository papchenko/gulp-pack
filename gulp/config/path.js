import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}`,
        images: `${buildFolder}/resources/`,
        files: `${buildFolder}/resources/`
    },
    src: {
        js: `${srcFolder}/js/main.js`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,//.pug
        images: `${srcFolder}/resources/**/*.{jpg,jpeg,svg,png,gif,webp}`,
        svg: `${srcFolder}/resources/**/*.svg`,
        files: `${srcFolder}/resources/**/*.*`,
      
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,//.pug
        images: `${srcFolder}/resources/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        files: `${srcFolder}/resources/**/*.*`
    },
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}