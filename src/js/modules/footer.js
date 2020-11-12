/* 此文件写尾部加载和尾部操作 */
define([
    // 'template',
    'jquery'
], (template) => {
    class Footer {
        constructor() {
            this.loadHTML().then(() => {

            })
        }
        /* 加载页面 */
        loadHTML() {
            return new Promise(resolve => {
                $('footer').load('/html/modules/footer.html', resolve)
            })
        }



    }
    return new Footer()
});