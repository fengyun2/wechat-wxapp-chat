Page({
  data: {
    text: "Page news",
    userInfo: {
      avatarUrl: "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIkA9qaz2lcxe2S9qnYBghDNvC6On7EZIrzGjibhhIWMCAU0thQhUh6jItP4qa3fnkrGbqPkV5bicGA/0",
      city: "Guangzhou",
      country: "CN",
      gender: 1,
      language: "zh_CN",
      nickName: "undefined",
      province: "Guangdong"
    },
    totalPeoples: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    const that = this
    let i = 1
    this.getUserInfo((res) => {
      setInterval(() => {
        res['id'] = 1
        that
          .data
          .totalPeoples
          .push(res)
        that.setData({
          totalPeoples: that.data.totalPeoples
        })
        i++
      }, 1000)

    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getUserInfo: function (cb) {
    cb = !!cb && typeof cb == 'function' ? cb : function () {}
    var that = this
      // if (this.data.userInfo) {
      //   typeof cb == "function" && cb(this.userInfo)
      // } else {
      //调用登录接口
    wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              })
              that.setData({
                text: '个人信息'
              })
              typeof cb == "function" && cb(that.data.userInfo)
            }
          })
        }
      })
      // }
  }
})