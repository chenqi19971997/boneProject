require.config({
    baseUrl: '/',
    paths:{     /* 是paths不是path */
        jquery: 'libs/jquery-3.5.1.min',
        template: 'libs/art-template/template-web',
        bootstrap:'libs/bootstrap/js/bootstrap.min',
        header:'js/modules/header1',
        footer:'js/modules/footer1',
        swiper:'libs/swiper/js/swiper.min',
        elevateZoom:'libs/jquery-plugins/jquery.elevatezoom',
        fly:'libs/jquery-plugins/jquery.fly'
    },
    shim:{
        fly:{
            deps:['jquery']
        },
        elevateZoom:{
            deps:['jquery']
        },
        bootstrap:{
            deps:['jquery']
        }
    }

})