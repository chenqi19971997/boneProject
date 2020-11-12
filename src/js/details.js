require(['./config'], () => {
    require(['template', 'header', 'elevateZoom', 'footer', 'fly'], (template, header, elevateZoom) => {
        class Index {
            constructor() {
                this.render().then(() => {
                    this.addToCart()
                    this.addImgActive()
                })
            }

            render() {
                // 从地址栏获取id，根据id来渲染详情页面
                const id = location.search.slice(4)-0
                console.log(id)
                return new Promise(resolve => {
                    $.get('http://www.xiongmaoyouxuan.com/api/detail', {
                        id
                    }, resp => {
                        console.log(resp)
                        if (resp.code === 200) {
                            // 从detail里把我需要渲染的数据解构出来
                            const {
                                id,
                                photo,
                                title,
                                price,
                                originPrice
                            } = resp.data.detail
                            // 把所有需要的数据写给this.detail，这样其他方法里也可以使用了
                            this.detail = {
                                id,
                                photo,
                                title,
                                price,
                                originPrice
                            }
                            $('#design').html(
                                template('designTemplate', {
                                    ...this.detail
                                })
                            )
                            // 这里模板渲染完成才代表成功
                            resolve()
                        }
                    })
                })

            }
            addToCart() {
                // 加入购物车：使用localStorage来存
                $('.btn2').on('click', e => {
                    console.log('点击了')
                    this.fly(e)
                    // 先取，判断是否已有数据
                    let cart = localStorage.getItem('cart')
                    if (cart) {
                        // 购物车已经有数据了
                        cart = JSON.parse(cart)
                        const isExist = cart.some(shop => shop.id === this.detail.id)
                        if (isExist) {
                            cart = cart.map(shop => {
                                if (shop.id === this.detail.id) {
                                    shop.count++
                                }
                                return shop
                            })
                        } else {
                            cart.push({
                                // ...this.detail,
                                id: this.detail.id,
                                image: this.detail.photo[0].url,
                                title: this.detail.title,
                                price: this.detail.price,
                                count: 1,
                                // check: true
                            })
                        }
                        localStorage.setItem('cart', JSON.stringify(cart))
                    } else {
                        localStorage.setItem('cart', JSON.stringify([{
                            // ...this.detail,
                            id: this.detail.id,
                            image: this.detail.photo[0].url,
                            title: this.detail.title,
                            price: this.detail.price,
                            count: 1,
                            // check: true
                        }]))
                    }
                })
            }
            fly(e) {
                $(`<img class="fly" src="${this.detail.photo[0].url}">`).fly({
                    start: {
                        left: e.clientX, //开始位置（必填）#fly元素会被设置成position: fixed
                        top: e.clientY, //开始位置（必填）
                    },
                    end: {
                        left: $('#cart').offset().left - $(window).scrollLeft(), //结束位置（必填）
                        top: $('#cart').offset().top - $(window).scrollTop() //结束位置（必填）
                        // width: 100, //结束时高度
                        // height: 100, //结束时高度
                    },
                    // autoPlay: false, //是否直接运动,默认true
                    speed: 0.7, //越大越快，默认1.2
                    // vertex_Rtop: 100, //运动轨迹最高点top值，默认20
                    onEnd: function () {
                        this.destroy()
                        // 重新计算购物车总数量
                        // 接收header对象调用header的方法实现计算
                        header.calcCartCount() //计算数量！！
                    } //结束回调
                })
            }
            /* 放大镜 */
            addImgActive() {
                // console.log('...')
                $('.zoom-image').elevateZoom({
                    gallery: 'gal1' // 放所有小图容器盒子ul的id，不加#
                })
            }
        }
        new Index()
    })
})