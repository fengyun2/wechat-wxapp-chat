##BUG

- ~~微信越来越傻帽了, 微信小程序socket就是接收不到值(而且造成服务器ws模块各种问题, 要使调试环境的微信小程序请求nodejs时, nodejs不报错, 必须设置 `verifyClient: socketVerify`),用原生的 websocket(client文件夹下)不知多么正常,无语了...~~

```js
    // 创建一个 socket 连接(必须是wss协议)
    wx.connectSocket({
      // url: 'ws://localhost',
      url: 'wss://dev.321zou.com', // 这个地址需要appid管理员设置才行, 切记
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
      complete: function (res) {
        console.log('complete: ', res)
      },
      fail: function (err) {
        console.log('connect error: ', err)
      }
    })
```

- 预览时居然不会编译es6原有的方法 `Object.assign` 等, 所以在手机上是个大坑(还是得用我强大的babel来救场)...

- `main-chat` 设置了高度为 `100%` 在手机端就不显示了, 好诡异...

```css
.main-chat {
  width: 100%;
  /*height: 100%;*/
  overflow: hidden;
}
```