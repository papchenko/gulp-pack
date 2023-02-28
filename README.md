![img](https://raw.githubusercontent.com/papchenko/gulp-pack/0feb4c69fe52bd7c3c28352c5aee09168d8b75ca/gulp-logo.svg)
##### version 2.0

### How to use
```
1. download files gulpfile.js, package.json, core.js. (or Gulp-02-2023.zip)
2. create a folder app in the root and add your project to this folder.
3. Download all necessary dependencies (terminal) npm i
4. check the correctness of your paths by default all files (pictures and others) are in the resources folder, the main script that you connect to the project must have the name main.js
```

#### Build your projects
```
npm run dev     -- developers pack
npm run build   -- productions pack
npm run zip     -- create zip-file
```

##### Which are the **dependencies** in the current **pack**
```

+ gulp: ^4.0.2
    gulp-cli: ^2.3.0
    gulp: ^4.0.2
    gulp-autoprefixer": ^8.0.0
    gulp-clean-css: ^4.3.0
    gulp-file-include: ^2.3.0
    gulp-group-css-media-queries: ^1.2.2
    gulp-if: ^3.0.0
    gulp-imagemin: ^8.0.0
    gulp-newer: ^1.4.0
    gulp-notify: ^4.0.0
    gulp-plumber: ^1.2.1
    gulp-rename: ^2.0.0
    gulp-replace: ^1.1.4
    gulp-sass: ^5.1.0
    gulp-version-number: ^0.2.4
    gulp-zip: ^5.1.0
    
+ webpack: ^5.75.0
     webpack-stream: ^7.0.0

+ browser-sync: 2.27.12

+ del: ^6.1.1 // use only this version for correct working!  

+ sass: ^1.58.3

```