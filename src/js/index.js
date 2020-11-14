/* 
模块化流程：
将需要的部分html分离到另一个html文件
建相应的js文件,define代码，并在里面写加载，返回一个对象
config中require引入需要的资源,调用对象, 引入art-template的template.js
全局js require引入config，调用对象
全局html引入require.js,其中的data-main引入相应的主js(如index.html对应index.js)
相应html添加header、footer标签
module的css文件添加头部、尾部scss，在相应html引入

需要新建三个js文件header.js, config.js,index.js,一个html文件header.html,还需要require.min.js。
复用模块的header.js,header.html,header.scss都放在modules里面
*/
require(['./config'], () => {
    require(['template', 'swiper', 'header', 'footer'], (template, Swiper) => {
        class Index {
            constructor() {
                this.getMyImages()
                this.getVideo()
                // this.getGiftList2()
                this.banner()
                this.getGiftList3()
            }
            /* 轮播图 */
            banner() {
                var mySwiper = new Swiper('.swiper-container', {
                    direction: 'horizontal', // 垂直切换选项
                    loop: true, // 循环模式选项
                    autoplay: true, // 自动播放
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                })
                var mySwiper = new Swiper('.swiper-container2', {
                    direction: 'horizontal', // 垂直切换选项
                    loop: true, // 循环模式选项
                    // 一行显示slider的个数
                    slidesPerview: 6,
                    // 定义slides的数量多少为一组
                    slidesPerGroup: 6,
                    /* 下一组滑动多少个 */
                    // autoplay: true, // 自动播放
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                })
            }
            getVideo() {
                // 根据本地json文件来渲染
                $.get('/libs/json/video.json', resp => {
                    // console.log(resp)
                    // console.log("resp:" + JSON.stringify(resp))
                    let $src = JSON.stringify(resp[0].src)
                    // console.log("$src:"+$src)
                    // console.log("$src01:" + $src.slice(1))
                    // console.log("$src02:" + $src.slice(0,$src.length - 1))
                    $src = $src.slice(1)
                    $src = $src.slice(0, $src.length - 1)
                    // console.log("$src03:" + $src)
                    $('.top18 .main .left video').attr('src', $src)
                })
            }
            getMyImages() {
                // 获取rap2假数据来渲染
                $.get('http://rap2api.taobao.org/app/mock/268738/api/index/list', resp => {
                    // console.log(resp)
                    // Access-Control-Allow-Origin
                    if (resp.code === 200) {
                        const {
                            list
                        } = resp.body
                        // 模板里所需要的数据和从后端拿到的数据变量名一致的时候对象才可以这么写
                        // $('#giftList').html(template('giftListTemplate', {
                        //     list
                        // }))
                        // console.log(list)
                        let $url = list[0].src
                        // console.log($url)
                        $('.top6 .main .left').css("background-image", "url(" + list[0].src + ")");
                        $('.top8 .main .left').css("background-image", "url(" + list[1].src + ")");
                        $('.top10 .main .left').css("background-image", "url(" + list[2].src + ")");
                        $('.top12 .main .left').css("background-image", "url(" + list[3].src + ")");
                        $('.top14 .main .left').css("background-image", "url(" + list[4].src + ")");
                        $('.top16 .main .left').css("background-image", "url(" + list[5].src + ")");
                    }
                })
            }
            /* 利用接口渲染的步骤：
            配置server服务器，方便跨域请求
            index中发送get请求获取数据
            html中将要要外部数据的代码放到后面的script中
            html中只留一个li，用each循环获得list中的数据渲染，格式见代码
            下载template,config中配置，require引入template
            require中写template
            */
            getGiftList2() {
                // 利用代理pdd接口来渲染
                $.get('/api/gindex/subject/limited/goods', {
                    subject_id: 30374,
                    page: 1,
                    size: 50
                }, resp => {
                    console.log(resp)
                    if (resp.result) {
                        const {
                            data
                        } = resp
                        // console.log(data);
                        $('#giftList2').html(template('giftList2Template', {
                            // list: data.slice(0, 6)
                            list: data.slice(0, 12)
                        }))
                    }
                })
            }
            // 利用熊猫优选接口渲染
            getGiftList3() {
                const id = 3
                $.get(`http://www.xiongmaoyouxuan.com/api/tab/${id}`, {
                    start: 0,
                    sort: 1
                }, resp => {
                    if (resp.code == 200) {
                        console.log(resp);
                        const {
                            list
                        } = resp.data.items
                        console.log(list);
                        $('#giftList3').html(
                            template('giftList3Template', {
                                list
                            })
                        )
                    }

                })
            }
        }
        new Index() //类要new一个实例对象才能被调用，如果在别的地方new就会在别的地方调用。里面可以传参。
                    //别的地方new的实例对象还可以调用这里的方法。
    })
})