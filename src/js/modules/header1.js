define([
    'template',
    'jquery'
], () => {
    class Header {
        constructor() {
            this.render().then(() => {
                this.calcCartNum()
                this.logOut()
                this.goTop()
            })
        }
        render() {
            return new Promise(resolve => {
                $('header').load('/html/modules/header.html', resolve)
            })
        }
        calcCartNum() {
            let cart = localStorage.getItem('cart')
            let count = 0
            if (cart) {
                cart = JSON.parse(cart)
                count = cart.reduce((num, shop) => {
                    return num + shop.count /* 需要return */
                }, 0)
            }
            $('#shopnum').html(count)
            $('#cart span').html(count)
            if (count < 100) {
                $('#redCart').html(count)
            } else {
                $('#redCart').html('n')
            }
        }
        logOut() {
            let name = utils.getCookie('name')
            if (name) {
                $('#yourName').html('你好，' + name)
                $('.login').attr('href', '#')
                $('.login').on('click', function () {
                    console.log('点击了');
                    $('.ImOut').slideToggle()
                })
                $('#outting').on('click', function () {
                    utils.removeCookie('name', {
                        path: '/'
                    })
                    $('.ImOut').hide()
                    $('.login').attr('href', '/html/login.html')
                })
            } else {
                $('.login').attr('href', '/html/login.html')
            }
        }
        goTop() {
            $(document).on('scroll', () => {
                if ($(document).scrollTop() > 500) {
                    $(".goTop").show();
                } else {
                    $(".goTop").hide();
                }
            })
            $('.goTop').on('click', function () {
                $('html,body').animate({
                    scrollTop: 0
                }, 1000)
            })
        }
    }
    new Header()
});