require(['./config'], () => {
    require([], () => {
        class Index {
            constructor() {
                this.login()
            }

            login() {
                document.querySelector('.btn1').onclick = function (e) {
                    const name = document.querySelector('#username').value
                    const pwd = document.querySelector('#password').value
                    let userList = localStorage.getItem('userList')
                    if (userList) {
                        userList = JSON.parse(userList) /* 转为能认识的 */
                        const isExist = userList.some(user => {
                            return user.name === name && user.pwd === pwd
                        })
                        if (isExist) {
                            // 存cookie（存根目录）
                            console.log(userList);
                            // 
                            console.log('name:',name);
                            let myName  //用户名
                            const username = userList.map(function (item) {
                                if(item.name==name){
                                    myName=item.firstname+item.lastname
                                }
                                return myName
                            })
                            console.log('username:',username);
                            console.log('登录成功')
                            // 将用户名传保存到cookie
                            // 七天免登录
                            if ($('.sen').prop('checked')) {
                                utils.setCookie('name', username, {
                                    path: '/',
                                    expires:7
                                })
                            }else{
                                utils.setCookie('name', username, {
                                    path: '/'
                                })
                            }
                            alert('登录成功，即将跳转首页')
                            window.open('/index.html', '_self')
                        } else {
                            alert('用户名或密码错误，请重试')
                        }
                    } else {
                        // 数据里没有注册过用户
                        alert('一个用户都没有，请先注册')
                        location.replace('/html/register.html') /* 变换页面 */
                    }
                    e.preventDefault()
                }
            }
        }
        new Index()
    })
})