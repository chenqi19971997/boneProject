require(['./config'], () => {
    require(['template', 'header', 'footer'], (template, header) => {
        class Index {
            constructor() {
                this.render()
                if (this.cart) {
                    this.setAllCheckStatus()
                    this.calcTotalMoney()
                    this.checksChange()
                    this.addSubCount()
                    this.setCheckAll()
                    this.calSendPrice()
                }
            }
            render() {
                // 根据localStorage购物车数据渲染列表
                const cart = localStorage.getItem('cart')
                if (cart) {
                    this.cart = JSON.parse(cart)
                    console.log(this.cart)
                    $('#goods').html(
                        template('goodsTemplate', {
                            cart: this.cart,
                        })
                    )
                    // 购物车不为空
                    $('.shopping_car').css('display', 'block')
                    $('.cart-empty').css('display', 'none')
                } else {
                    // 购物车为空
                    // $('#cart-empty').show()
                    // $('#shopping_car').hide()
                    $('.shopping_car').css('display', 'none')
                    $('.cart-empty').css('display', 'block')
                }
                this.addSubCount() /* 渲染后重新调用，不然点一次就不能再点了 */
            }
            calcTotalMoney() {
                const allMoney = this.cart.reduce((money, shop) => {
                    if (shop.check) {
                        money += shop.price * shop.count
                    }
                    // 无论条件是否满足，都要return
                    return money
                }, 0)
                $('#totalPrice1').html(allMoney.toFixed(2))
                $('#totalPrice2').html(allMoney.toFixed(2))
                // console.log(this.cart[0].count)
                for (var index in this.cart) {
                    /* 计算小计价格 */
                    // console.log("i:" + index)
                    $('.littlePrice').eq(index).html('小计：￥' + (this.cart[index].count * this.cart[index].price).toFixed(2))
                }
            }
            addSubCount() {
                const _this = this
                console.log(this);
                $('.sub').on('click', function () {     /* TODO：第一次点的时候会加2？？？ */
                    const id = $(this).parents('.good').data('id') /* data中的id为字符串，要加引号 */
                    console.log(id, '...')
                    _this.cart = _this.cart.map(shop => {
                        if (shop.id === id) {
                            shop.count--
                            if (shop.count <= 0) {
                                shop.count = 1
                            }
                        }
                        return shop
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    _this.render()
                    _this.calcTotalMoney()
                    header.calcCartCount()
                })
                $('.add').on('click', function () {
                    const id = $(this).parents('.good').data('id')
                    console.log(id, '...')
                    _this.cart = _this.cart.map(shop => {
                        if (shop.id === id) {
                            shop.count++
                        }
                        return shop
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    _this.render()
                    _this.calcTotalMoney()
                    header.calcCartCount()
                })
                /* 直接输入数量 */
                $('.countNum').on('change', function () {
                    const id = $(this).parents('.good').data('id')
                    console.log("id:" + id)
                    const value = $(this).val()
                    console.log(id, '...')
                    _this.cart = _this.cart.map(shop => {
                        if (shop.id === id) {
                            shop.count = value - 0
                        }
                        return shop
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    _this.render()
                    _this.calcTotalMoney() /* 编辑后刷新才能更新购物车数量？？？ */
                    header.calcCartCount()
                })
                /* 删除商品 */
                $('.del').on('click', function () {
                    const id = $(this).parents('.good').data('id')
                    console.log("id:", id)
                    _this.cart = _this.cart.map(shop => {
                        if (shop.id === id) {
                            let cartObj = JSON.parse(localStorage.getItem('cart'))
                            for (var i = 0; i < cartObj.length; i++) {
                                if (cartObj[i].id === id) {
                                    cartObj.splice(i, 1)
                                    _this.cart = cartObj
                                    if (cartObj.length == 0) {
                                        localStorage.removeItem('cart')
                                    } else {
                                        localStorage.setItem('cart', JSON.stringify(_this.cart))
                                    }
                                }
                            }
                        }
                        return shop
                    })
                    _this.render() /* 不写这个不能删了后刷新？？？ */
                    _this.calcTotalMoney()
                    header.calcCartCount()
                })
                /* 编辑操作 */
                $('.edit').on('click', function () {
                    console.log('编辑')
                    $(this).parents('.good').find('.countNum').focus()
                }) /* find 方法找里面的元素 */
            }
            /* 全选 */
            setAllCheckStatus() {
                const isAllCheck = this.cart.every(shop => shop.check)
                $('#checkAll').prop('checked', isAllCheck) /* prop在这里设置属性 */
            }
            /* 点击全选 */
            setCheckAll() {
                const _this = this
                const cart = JSON.parse(localStorage.getItem('cart'))
                $('#checkAll').on('change', function () {
                    const _this2 = this
                    console.log('点击了选择');
                    // console.log(this.checked);拿到是否选择
                    console.log(cart)
                    _this.cart = _this.cart.map(shop => {
                        shop.check = this.checked
                        return shop
                    })
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    $('.checkhh').each(function (index, ele) {
                        ele.checked = _this2.checked /* 改变选中属性 */
                    })
                    _this.calcTotalMoney()
                })
                // this.render()    //调用这个之后 重新加载了DOM 之前做的那些都不会生效了
            }
            /* 选择变化 */
            checksChange() {
                const _this = this
                $('.checkhh').on('change', function () {
                    // console.log('点击了')
                    const id = $(this).parents('.good').data('id')
                    _this.cart = _this.cart.map(shop => {
                        if (shop.id === id) {
                            shop.check = $(this).prop('checked')
                        }
                        return shop
                    })
                    console.log(_this.cart);
                    // 存localStorage
                    localStorage.setItem('cart', JSON.stringify(_this.cart))
                    // 重新设置全选
                    _this.setAllCheckStatus()
                    // 重新计算总价
                    _this.calcTotalMoney()
                })
            }
            calSendPrice() {
                $('.getPrice').on('click', function () {
                    if ($('#province').val() == 0 || $('#sendNum').val() == '') {
                        alert('所属省或邮政编码不能为空')
                    } else {
                        const country = $('#country').val() - 0
                        const province = $('#province').val() - 0
                        console.log(country, province)
                        let sendPrice1
                        let sendPrice2
                        if (country !== 1) {
                            sendPrice1 = 30
                            sendPrice2 = 50
                        } else {
                            if (province == 1) {
                                sendPrice1 = 12
                                sendPrice2 = 20
                            } else {
                                sendPrice1 = 15
                                sendPrice2 = 25
                            }
                        }
                        console.log(sendPrice1, sendPrice2);
                        $('#sendPrice1').html('￥' + sendPrice1)
                        $('#sendPrice2').html('￥' + sendPrice2)
                        $('.send').css('display', 'block')
                    }
                })
            }
        }
        new Index()
    })
})