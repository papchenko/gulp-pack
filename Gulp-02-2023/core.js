const buildFolder = `./build`;
const appFolder = `./app`;

export const path = {
    build: {
        images: `${buildFolder}/resources/`,
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/resources/`
    },
    src: {
        images: `${appFolder}/resources/**/*.{jpg,jpeg,png,gif,ico,webp}`,
        svg: `${appFolder}/resources/**/*.svg`,
        js: `${appFolder}/js/main.js`,
        scss: `${appFolder}/scss/style.scss`,
        html: `${appFolder}/*.html`,
        files: `${appFolder}/resources/**/*.*`
    },
    watch: {
        images: `${appFolder}/resources/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
        js: `${appFolder}/js/**/*.js`,
        scss: `${appFolder}/scss/**/*.scss`,
        html: `${appFolder}/**/*.html`,
        files: `${appFolder}/resources/**/*.*`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    appFolder: appFolder,
}

// plugins
import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import newer  from "gulp-newer";
import gulpIf from "gulp-if";

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browserSync: browserSync,
    newer: newer,
    if: gulpIf
}

// copy
export const copy = () => {
    return appGulp.gulp.src(appGulp.path.src.files)
    .pipe(appGulp.gulp.dest(appGulp.path.build.files))
}

// cleaning
import del from "del";

export const cleaning = () => {
    return del(appGulp.path.clean);
}

// html
import fileinclude from "gulp-file-include";
import versionNumber from "gulp-version-number";

export const html = () => {
    return appGulp.gulp.src(appGulp.path.src.html)
    .pipe(appGulp.plugins.plumber(
        appGulp.plugins.notify.onError({
            title: "HTML-Error",
            message: "Error: <%= error.message %>"
        }))
    )
    .pipe(fileinclude())
    .pipe(appGulp.plugins.replace(/@img\//g, 'img/'))
    .pipe(appGulp.plugins.if(appGulp.isBuild,
        versionNumber({
        'value': '%DT%',
        'append': {
            'key': '_v',
            'cover': 0,
            'to': [
                'css',
                'js',
            ]
        },
        'output': {
            'file': 'version.json'
        }
    })))
    .pipe(appGulp.gulp.dest(appGulp.path.build.html))
    .pipe(appGulp.plugins.browserSync.stream())
}

// liveServer
export const liveServer = (done) => {
    appGulp.plugins.browserSync.init({
        server: {
            baseDir: `${appGulp.path.build.html}`
        },
        notify: false,
        port: 3000
    });
}


// scss
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; 
import autoprefixer from 'gulp-autoprefixer'; 
import groupCssMediaQueries from 'gulp-group-css-media-queries'; 

const sass = gulpSass(dartSass);

export const scss = () => {
	return appGulp.gulp.src(appGulp.path.src.scss, { sourcemaps: appGulp.isDev })
		.pipe(appGulp.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(
			appGulp.plugins.if(
				appGulp.isBuild,
				groupCssMediaQueries()
			)
		)
				.pipe(
					appGulp.plugins.if(
						appGulp.isBuild,
						autoprefixer({
							grid: true,
							overrideBrowserslist: ["last 3 versions"],
							cascade: true
						})
					)
				)
		.pipe(appGulp.gulp.dest(appGulp.path.build.css))
		.pipe(
			appGulp.plugins.if(
				appGulp.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(appGulp.gulp.dest(appGulp.path.build.css))
		.pipe(appGulp.plugins.browserSync.stream());
}

// js
import webpack from "webpack-stream"

export const js = () => {
    return appGulp.gulp.src(appGulp.path.src.js, {sourcemaps: appGulp.isDev})
    .pipe(appGulp.plugins.plumber(
        appGulp.plugins.notify.onError({
            title: "JS-Error",
            message: "Error: <%= error.message %>"
        })))
    .pipe(webpack({
        mode: appGulp.isBuild ? 'production' : 'development',
        output: {
            filename: 'main.min.js'
        }
    }))
    .pipe(appGulp.gulp.dest(appGulp.path.build.js))
    .pipe(appGulp.plugins.browserSync.stream())
}

// images
import imagemin from "gulp-imagemin";

export const images = () => {
    return appGulp.gulp.src(appGulp.path.src.images, {sourcemaps: appGulp.isDev})
    .pipe(appGulp.plugins.plumber(
        appGulp.plugins.notify.onError({
            title: "IMAGES-Error",
            message: "Error: <%= error.message %>"
        })))
        .pipe(appGulp.plugins.newer(appGulp.path.build.images))
        
        .pipe(appGulp.plugins.if(appGulp.isBuild, appGulp.gulp.dest(appGulp.path.build.images)))
        .pipe(appGulp.plugins.if(appGulp.isBuild, appGulp.gulp.src(appGulp.path.src.images)))
        .pipe(appGulp.plugins.if(appGulp.isBuild, appGulp.plugins.newer(appGulp.path.build.images)))
        .pipe(appGulp.plugins.if(appGulp.isBuild,
            imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
        })))
    .pipe(appGulp.gulp.dest(appGulp.path.build.images))
    .pipe(appGulp.gulp.src(appGulp.path.src.svg))
    .pipe(appGulp.gulp.dest(appGulp.path.build.images))
    .pipe(appGulp.plugins.browserSync.stream())
}

// zip
import gulpZip from "gulp-zip";

export const zip = () => {
    del(`./${appGulp.path.build}.zip`);
    return appGulp.gulp.src(`${appGulp.path.buildFolder}/**/*.*`, {})
    .pipe(appGulp.plugins.plumber(
        appGulp.plugins.notify.onError({
            title: "ZIP-Error",
            message: "Error: <%= error.message %>"
        })))
        .pipe(gulpZip(`yourApp.zip`))
        .pipe(appGulp.gulp.dest('./build/zip/'))
}