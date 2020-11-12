const utils = {
  /**
   * 存cookie
   * @param {string} key     要存的cookie的名称
   * @param {string} value   要存的cookie的值
   * @param {object} option  { expires: 7, path: '/' } 存一个7天过期的根目录的cookie
   */
  // ES6增强对象写法，不用谢键值对了，直接 方法名 () {}
  setCookie (key, value, option) {
    // 存的时候cookie的值编码
    var str = `${key}=${encodeURIComponent(value)}`
    if (option) {
      if (option.path) {
        str += `;path=${option.path}`
      }
      if (option.expires) {
        var date = new Date()
        date.setDate(date.getDate() + option.expires)
        str += `;expires=${date.toUTCString()}`
      }
    }
    document.cookie = str
  },

  /**
   * 取cookie
   * @param {string} [key] 要取的cookie的名称，如果不传返回所有cookie
   * @return {string || object}  取出来的cookie的值，如果没有可以返回整个对象
   */
  getCookie (key) {
    var str = document.cookie
    var cookies = str.split('; ')
    // 遍历cookies数组，每一个元素再按照=拆开成属性名和属性值
    var obj = {}
    cookies.forEach(cookie => {
      var arr = cookie.split('=')
      // arr[0]作为属性名，arr[1]作为属性值放入obj
      // 取的时候把属性值解码
      obj[arr[0]] = decodeURIComponent(arr[1])
    })
    return key ? obj[key] : obj
  },

  /**
   * 删除cookie
   * @param {string} key 要删除的cooie的名称
   * @param {string} [path] 可选参数，cookie的路径 
   */
  removeCookie (key, path) {
    var date = new Date()
    date.setDate(date.getDate() - 10000)
    var str = `${key}=0;expires=${date.toUTCString()}`
    if (path) {
      str += `;path=${path}`
    }
    document.cookie = str
  }
}
