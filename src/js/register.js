require(['./config'], () => {
    require([], () => {
        class Index {
            constructor() {
                this.register()
            }
            // 注册
            /* 
            一级必填项（用于登录）：电子邮件、地址  
            二级必填项：所有其他
                所有数据保存到localStorage
            */
            register() {
                console.log('开始注册')
                $('.btn1').on('click', function (e) {
                    e = e || window.event;
                    e.preventDefault();
                    // 取到所有输入的内容
                    const userinfo = {
                        // 邮件地址
                        name: document.querySelector('#userEmail').value,
                        // 密码
                        pwd: document.querySelector('#password').value,
                        // 
                        firstname: $('#firstname').val(),
                        lastname: $('#lastname').val(),
                        pho1: $('#pho1').val(),
                        pho2: $('#pho2').val(),
                        birthYear: $('#birthYear').val(),
                        birthMonth: $('#birthMonth').val(),
                        birthDay: $('#birthDay').val(),
                        gender: $('#gender').val(),
                    }
                    console.log(userinfo)
                    console.log(userinfo.firstname)
                    if (userinfo.firstname.length< 1) {
                        alert('请输入您的姓')
                        return false;
                    }
                    if (userinfo.lastname.length < 1) {
                        alert('请输入您的名')
                        return false;
                    }
                    if (userinfo.name.length < 1) {
                        alert('请输入您的邮件地址')
                        return false;
                    }
                    if (userinfo.pwd.length < 1) {
                        alert('密码不能为空')
                        return false;
                    }
                    if (userinfo.pho2.length < 1) {
                        alert('请输入您的电话号码')
                        return false;
                    }
                    if (userinfo.birthYear.length < 1) {
                        alert('请输入您的出生年')
                        return false;
                    }
                    if (userinfo.birthMonth.length < 1) {
                        alert('请输入您的出生月')
                        return false;
                    }
                    if (userinfo.birthDay.length < 1) {
                        alert('请输入您的出生日')
                        return false;
                    }
                    console.log('gender:',userinfo.gender);
                    if (userinfo.gender==null) {
                        alert('请输入您的性别')
                        return false;
                    }
                    // 先取
                    // 判断是否已经有数据了
                    let userList = localStorage.getItem('userList')
                    if (userList) {
                        // 已经注册过其他用户了
                        // 取出来的字符串解析成数组
                        userList = JSON.parse(userList)
                        // 把现在这条用户信息push到list里
                        userList.push(userinfo)
                        localStorage.setItem('userList', JSON.stringify(userList))
                    } else {
                        // 一个用户都还没有注册过
                        // 存入只有userinfo这一条数据的数组
                        localStorage.setItem('userList', JSON.stringify([userinfo]))
                    }
                    alert('注册成功，即将跳转登录页')
                    location.href = '/html/login.html' 
                })
            }
        }
        new Index()
    })
})