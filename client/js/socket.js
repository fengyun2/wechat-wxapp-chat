
;(function () {
  const ws = new WebSocket("ws://127.0.0.1:8000")

  ws.onopen = function () {
    console.log('连接状态 :', ws)
  }

  ws.onmessage = function (res) {
    console.log('接收到数据', res.data)
  }

  ws.onclose = function (res) {
    console.log('关闭连接', res)
  }

  ws.onerror = function (err) {
    console.log('发送错误', err)
   }

   function $$(selector) {
     return document.querySelector(selector)
   }

   const sendNode = $$('#send')
   const exitNode = $$('#exit')

   sendNode.addEventListener('click', send, false)
   exitNode.addEventListener('click', exit, false)

   function send() {
     const msg = $$('#message').value
     const name = $$('#name').value

     const str = JSON.stringify({
       msg: msg,
       name: name
     })

     ws.send(str)
   }

   function exit () {
     const close = ws.close()

     console.log('退出', close)
   }

})()