require(['./config'], () => {
    require(['template', 'header', 'footer', 'fly', 'jquery', 'bootstrap'], (template, header) => {
        class Index {
            constructor() {
                this.getList().then(() => {
                    this.addToCart()
                    // header.showBox()     已经引入了header，就不必再去调用里面的方法了！！
                    //                        不然点击一下会执行两次？？？
                    this.myLove()
                })
            }
            getList() {
                // const id = 2
                let id = location.search.slice(4, 5) - 0
                console.log(id);
                return new Promise(resolve => {
                    $.get(`http://www.xiongmaoyouxuan.com/api/tab/${id}`, {
                        start: 0,
                        sort: 1
                    }, resp => {
                        let search = false //标注是否当前页为搜索结果页
                        let searchValue
                        if (id == 7) {
                            search = true
                            searchValue = decodeURIComponent(location.search.slice(12))
                        }
                        console.log(resp, '1111') /* 写加号会转为字符串 */
                        if (resp.code === 200) {
                            let {
                                list
                            } = resp.data.items /* ??? */
                            /* 过滤掉没有销售数量的项 */
                            list = list.filter(function (item) {
                                if (item.saleNum) {
                                    return item
                                }
                            })
                            console.log(list, '888');
                            // 判断是否搜索页
                            if (search) {
                                list = list.filter(function (item) {
                                    if (item.title.indexOf(searchValue) !== -1) {
                                        return item
                                    }
                                })
                            }
                            console.log(list);
                            this.detail = {
                                list
                            }
                            const list1 = list.filter(function (item, index) {
                                if (index / 16 < 1) {
                                    return item
                                }
                            })
                            const list2 = list.filter(function (item, index) {
                                if (index / 16 >= 1) {
                                    return item
                                }
                            })
                            console.log('detailList:', this.detail.list);
                            console.log(list);
                            $('#list').html(
                                template('listTemplate', {
                                    list: list1
                                })
                            )
                            $('#page1').on('click', function () {
                                $('#list').html(
                                    template('listTemplate', {
                                        list: list1
                                    })
                                )
                                $('html,body').scrollTop(0)
                            })
                            $('#page2').on('click', function () {
                                $('#list').html(
                                    template('listTemplate', {
                                        list: list2
                                    })
                                )
                                $('html,body').scrollTop(0)
                            })
                            /* 排序 */
                            function sortByInt(array, key) {
                                return array.sort(function (b, a) {
                                    var x = a[key]
                                    var y = b[key]
                                    return x - y
                                })
                            }
                            /* 渲染热销列表 */
                            var list0 = sortByInt(list, "saleNum")
                            console.log('排序后：', list0);
                            $('#soldList').html(
                                template('soldListTemplate', {
                                    list0: list0.slice(0, 6)
                                })
                            )
                            resolve()
                        }
                    })
                })
            }
            addToCart() {
                // 加入购物车：使用localStorage来存
                const _this = this
                $('.add').on('click', function (e) {
                    /* 获取下拉框的数字 */
                    let plusNum = $(this).parents('.good').find('.select').val() - 0
                    console.log('plusNum:', plusNum);
                    /* 异步方法必须在promise后调用 */
                    let id = $(this).parents('.good').data("id")
                    console.log("id:", id)
                    _this.fly(e, id, _this.detail.list)
                    let myDetail
                    _this.detail.list.map(e => {
                        if (e.id === id) {
                            myDetail = e
                        }
                    })
                    console.log(myDetail)
                    // 先取，判断是否已有数据
                    let cart = localStorage.getItem('cart')
                    if (cart) {
                        // 购物车已经有数据了
                        cart = JSON.parse(cart)
                        console.log('cart:', cart);
                        const isExist = cart.some(shop => shop.id === id)
                        if (isExist) {
                            cart = cart.map(shop => {
                                if (shop.id === id) {
                                    shop.count += plusNum
                                }
                                return shop
                            })
                        } else {
                            cart.push({
                                // ...myDetail,
                                id: myDetail.id,
                                // 'photo[0].url': myDetail.image,
                                image: myDetail.image,
                                title: myDetail.title,
                                price: myDetail.price,
                                count: plusNum,
                            })
                        }
                        localStorage.setItem('cart', JSON.stringify(cart))
                    } else {
                        localStorage.setItem('cart', JSON.stringify([{
                            // ...myDetail,
                            id: myDetail.id,
                            // photo[0].url: myDetail.image,
                            image: myDetail.image,
                            title: myDetail.title,
                            price: myDetail.price,
                            count: plusNum
                        }]))
                    }
                })
            }
            fly(e, idabc, list) {
                let id = idabc
                let url
                list.map(shop => {
                    if (shop.id === id) {
                        url = shop.image
                    }
                    return url
                })
                $(`<img class="fly" src='${url}'>`).fly({
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
            myLove() {
                let loveList = localStorage.getItem('loveList')
                if (loveList) {
                    loveList = JSON.parse(loveList)
                    console.log('喜欢列表', loveList);
                }
                // 过滤列表中不喜欢的东西
                loveList = loveList.filter(function (item) {
                    // return 过滤的条件
                    return item.love == true
                })
                loveList = loveList.slice(0, 6)
                $('#myLove').html(
                    template('myLoveTemplate', {
                        /* 为什么下面不能使用slice */
                        loveList
                    })
                )
            }
        }
        new Index()
    })
})