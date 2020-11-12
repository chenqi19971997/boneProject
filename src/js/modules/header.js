/* 此文件写头部逻辑 */
define([
    'template',
    'jquery'
], (template) => {
    class Header {
        constructor() {
            this.loadHTML().then(() => {
                this.calcCartCount()
                this.showBox()
                this.goTop()
                this.logOut()
            })
        }
        /* 加载页面 */
        loadHTML() {
            return new Promise(resolve => {
                $('header').load('/html/modules/header.html', resolve) /* resolve要不要括号？？？ */
            })
        }
        calcCartCount() {
            let count = 0
            let cart = localStorage.getItem('cart')
            if (cart) {
                cart = JSON.parse(cart)
                count = cart.reduce((num, shop) => num + shop.count, 0)
            }
            $('#shopnum').html(count)
            $('#cart span').html(count)
            if (count < 100) {
                $('#redCart').html(count)
            } else {
                $('#redCart').html('n')
            }
        }
        showBox() {
            $('#show').on('mouseover', function () {
                $('.showBox').css('display', 'flex')
            })
            $('.showBox').on('mouseover', function () {
                $('.showBox').css('display', 'flex')
            })
            $('#show').on('mouseout', function () {
                $('.showBox').css('display', 'none')
            })
            $('.showBox').on('mouseout', function () {
                $('.showBox').css('display', 'none')
            })
        }
        /* 回顶部 */
        goTop() {
            $('.goTop').on('click', function () {
                // console.log('点击了向上');
                $('html,body').animate({
                    scrollTop: 0
                }, 1000)
            })
            $(document).on('scroll', function () {
                if ($(document).scrollTop() > 500) {
                    $(".goTop").show();
                } else {
                    $(".goTop").hide();
                }
            })
        }
        /* 注销登录 */
        logOut() {
            var name = utils.getCookie('name')
            // console.log('name:', name);
            if (name) {
                // console.log('已登录');
                $('#yourName').html('你好,'+name)
                $('.login').attr('href', '#')
                $('.login').on('click', function () {
                    console.log('点击了');
                    // if ($('.ImOut').hasClass('displayMe')) {
                    //     $('.ImOut').removeClass('displayMe')
                    // } else {
                    //     $('.ImOut').addClass('displayMe')
                    // }
                    $('.ImOut').slideToggle()    /* 上面代码的简化形式 */
                })
                $('#outting').on('click', function () {
                    // 清除cookie
                    utils.removeCookie('name',{path:'/'})
                    $('.ImOut').hide()
                    $('.login').attr('href', '/html/login.html')
                    // location.replace('/html/login.html')
                })
            } else {
                // console.log('未登录');
                $('.login').attr('href', '/html/login.html')
            }
        }
    }
    return new Header()/* ？？？ */
});