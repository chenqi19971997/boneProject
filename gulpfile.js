/* 
gulp在项目中的使用，都需要写在gulpfile中。

gulp插件使用流程：
  1、npm i安装
  2、如const gulp = require('gulp') 引入插件
  3、方法中使用

  要明白的是要干什么，做这件事需要使用什么插件，插件要怎么用(做什么，用什么，怎么用)
*/
const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      cleanCss = require('gulp-clean-css'),
      autoprefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      del = require('del'),
      connect = require('gulp-connect'),
      // 引入包的同时直接解构出来使用
      { createProxyMiddleware } = require('http-proxy-middleware'),
      sass = require('gulp-sass')
     

// gulp.task 以前3的用法

// 提前规划所有文件的路径
const paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'dist'
  },
  css: {
    src: 'src/css/**/*.scss',
    dest: 'dist/css'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  libs: {
    src: 'src/libs/**',
    dest: 'dist/libs'
  },
  imgs: {
    src: 'src/images/**',
    dest: 'dist/images'
  },
  apis: {
    src: 'src/api/**',
    dest: 'dist/api'
  }
}

// 制定delDist任务：删除dist目录
const delDist = () => del('dist')

// 指定html任务：压缩html，从src里把html文件取出来，然后压缩，最后放进dist目录
const html = () => {
  // ** 代表所有目录，*代表所有文件
  return gulp.src(paths.html.src)
    .pipe(htmlmin({
      removeComments: true, // 清除HTML注释
      collapseWhitespace: true, // 压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: false,//删除<script>的type="text/javascript" 使text/html模板可生效？？？
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS 
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload())
}

// 制定css任务：先把scss转成css，再给css3一些样式加上前缀，最后压缩css
const css = () => {
  return gulp.src(paths.css.src)
    .pipe(sass()) 
    .pipe(autoprefixer({   
      cascade: false
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(connect.reload())
}

// 制定js任务：先ES6转成ES5，再压缩
const js = () => {
  return gulp.src(paths.js.src)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(connect.reload())
}

// 制定libs任务：把libs的文件全部移动到dist目录
const libs = () => gulp.src(paths.libs.src).pipe(gulp.dest(paths.libs.dest))

// 制定imgs任务：把images的文件全部移动到dist目录
const imgs = () => gulp.src(paths.imgs.src).pipe(gulp.dest(paths.imgs.dest))

// 制定libs任务：把libs的文件全部移动到dist目录
const apis = () => gulp.src(paths.apis.src).pipe(gulp.dest(paths.apis.dest))

// 制定server任务：开启一个本地node服务器
const server = () => {
  connect.server({  
    root: 'dist',
    port: 2000,
    livereload: true,
    middleware () {
      return [  /* 可能返回多个中间键 */
        // 把前端以api开头的请求代理到拼多多  跨域需要安装middleware插件
        createProxyMiddleware('/api', { /* 以/api开头的网址就代理到拼多多这个域 */
                                        /* get请求的网址为拼多多xhr网址 删掉/api前面的部分
                                          问号后面的数据写到后面的花括号中 */
                                          /* 熊猫优选的数据不用跨域就可以用 */
          target: 'https://apiv2.pinduoduo.com',/* 找网站的xhr的headers 有api开头的网址 */
          changeOrigin: true
        })
      ]
    }
  })
}

// watch：监听文件改变，当文件发生修改可以重启对应的任务
const watch = () => {
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.js.src, js)
  gulp.watch(paths.css.src, css)
}

// 把制定好的任务导出
// 这种写法是把各个任务单独导出，只能单个执行
// module.exports = {
//   html,
//   css,
//   js,
//   libs,
//   imgs
// }

// parallel：异步执行任务
// series：同步执行任务
// 导出defult这一个任务，在这个任务里先同步执行删除dist的任务，再异步的执行其他任务
module.exports.default = gulp.series(delDist, gulp.parallel(html, css, js, libs, imgs, apis , server, watch))
