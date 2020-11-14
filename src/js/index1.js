require(['./config'],()=>{
    require(['template','swiper','header','footer','jquery'],(template,Swiper)=>{
        class Index{
            constructor(){
                this.banner()
                this.getList()
            }
            banner(){
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
            getList(){
                const id=2
                $.get(`http://www.xiongmaoyouxuan.com/api/tab/${id}`,{
                start:0,    
                sort:0
                },resp=>{
                    console.log(resp);
                    if(resp.code==200){
                        const{
                            list
                        }=resp.data.items
                        $('#giftList3').html(
                            template('giftList3Template',{
                            list
                        }))
                    }
                })
            }
        }
        new Index()
    })
})