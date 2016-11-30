
;(function () {
  const ws = new WebSocket("ws://127.0.0.1:8000")

  ws.onopen = function () {
    console.log('连接状态 :', ws)
  }

  ws.onmessage = function (res) {
    console.log('接收到数据', res)
  }

  ws.onclose = function (res) {
    console.log('关闭连接', res)
  }

  ws.onerror = function (err) {
    console.log('发送错误', err)
   }
})()