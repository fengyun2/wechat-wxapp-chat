let socketOpen = false
let socketMsgQueue = ['name', 'age', 'sex', 'province', 'city']

Page({
  data: {
    text: "Page chat",
    userInfo: null,
    totalPeoples: []
  },
  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数

    const that = this
    this.getUserInfo((res) => {
      that
        .data
        .totalPeoples
        .push(res)
      that.setData({totalPeoples: that.data.totalPeoples})
    })

    // 创建一个 socket 连接(必须是wss协议)
    wx.connectSocket({
      // url: 'ws://localhost:3000',
      url: 'ws://localhost:8000',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log('connect success: ', res)
      },
      complete: function(res) {
        console.log('complete: ', res)
      },
      fail: function (err) {
        console.log('connect error: ', err)
      }
    })

    // 监听websocket打开事件
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已经打开!')

      socketOpen = true
      for (var i = 0, len = socketMsgQueue.length; i < len; i++) {
        sendSocketMessage(socketMsgQueue[i])
      }

      // 关闭socket
      wx.closeSocket()
      // socketMsgQueue = []
    })

    function sendSocketMessage(msg) {
      if (socketOpen) {
        wx.sendSocketMessage({data: msg})
      } else {
        socketMsgQueue.push(msg)
      }
    }

    // 监听WebSocket错误
    wx
      .onSocketError(function (res) {
        console.log('WebSocket连接打开失败, 请检查!')
      })

    // wx.sendSocketMessage 通过WebSocket连接发送数据, 需要先先 wx.connectSocket, 并在
    // wx.onSocketOpen 回调之后才能发送 监听WebSocket 接收到拂去其的消息事件
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容: ' + res.data)
    })

    // 关闭WebSocket连接 监听websocket连接
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭!')
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
  getUserInfo(cb = () => {}) {
    var that = this
    if (this.data.userInfo) {
      typeof cb == "function" && cb(this.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.setData({userInfo: res.userInfo})
              that.setData({text: '个人信息'})
              typeof cb == "function" && cb(that.data.userInfo)
            }
          })
        }
      })
    }
  }
})