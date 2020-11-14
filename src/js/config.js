/* 头部复用config.js index.js header.js都用到 */

require.config({
    baseUrl: '/',
    paths: {
            /* 是paths不是path */
        swiper: 'libs/swiper/js/swiper.min',
        /* 不需要前面的/，上面的baseUrl已经配置了。不写后缀。 */
        template: 'libs/art-template/template-web',
        jquery: 'libs/jquery-3.5.1.min',
        header: 'js/modules/header',
        footer: 'js/modules/footer',
        elevateZoom: 'libs/jquery/jquery.elevateZoom-3.0.8.min',
        fly: 'libs/jquery-plugins/jquery.fly',
        bootstrap: 'libs/bootstrap/js/bootstrap.min'

    },
    shim: {
        /* 什么时候写垫片:插件不遵循amd规范又要依赖别的模块时 */
        fly: {
            deps: ['jquery'] /* 需要依赖jquery，可能依赖多个，就在数组里面写多个 */
        },
        /* 比如bootstrap就依赖jquery。让jquery在fly之前就引入 */
        elevateZoom: {
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
})