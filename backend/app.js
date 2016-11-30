/**
 * 暂时废弃
 * 1. 微信小程序必须要 wss协议
 * 2. 在客户端如果用 socket.io方式就可以，换成 html5的websocket 或 微信小程序内置的socket方* 式 都不行(socket.io使用的是http协议)。
 */

// const http = require('http')
// const Koa = require('koa')
// const Router = require('koa-router')
// const path = require('path')
// const convert = require('koa-convert')
// const bodyParser = require('koa-bodyparser')
// const json = require('koa-json')
// const logger = require('koa-logger')

// const app = new Koa()
// // const router = new Router()

// app
//   .use(bodyParser())
//   .use(json())
//   .use(logger())
//   // .use(router.routes())
//   // .use(router.allowedMethods())

// // // logger
// // app.use(async(ctx, next) => {
// //   const start = new Date()
// //   await next()
// //   const ms = new Date - start
// //   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// // })

// // router.get('/', (ctx, next) => {
// //   // process.env.TZ = 'Europe/London'
// //   // console.log(process.env.TZ)
// //   ctx.body = {
// //     code: 200,
// //     message: 'Hello LY'
// //   }
// //   // next()
// // })

// // // 404
// // app.use(ctx => {
// //   ctx.status = 404
// //   ctx.body = {
// //     code: 404,
// //     message: '页面不存在'
// //   }
// // })

// // error
// app.on('error', async(err, ctx) => {
//   console.error('error occured: ', err)
// })

// const port = process.env.PORT || 3000
// // const server = http.createServer(app.callback())
// const server = http.Server(app.callback())
// const io = require('socket.io')(server)

// io.on('connection', socket => {
//   console.log('a user connected')

//   // 给当前连接的用户发送信息
//   socket
//     .broadcast
//     .emit('connection', '恭喜您, 您已经连接上了我们的聊天室了, 现在您可以开始聊天了')

//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })

//   socket.on('chat message', msg => {
//     console.log(`message: ${msg}`)

//     // 给每个连接的用户都发送消息
//     io.emit('chat message', msg)
//   })
// })

// server.listen(port)
// // server.on('error', err => {
// //   if (err.syscall !== 'listen') {
// //     throw err
// //   }
// //   // handle specific listen errors with friendly messages
// //   switch (error.code) {
// //     case 'EACCES':
// //       {
// //         console.error(port + ' requires elevated privileges');
// //         process.exit(1)
// //         break

// //       }
// //     case 'EADDRINUSE':
// //       {
// //         console.error(port + ' is already in use');
// //         process.exit(1)
// //         break
// //       }
// //     default:
// //       {
// //         throw error
// //       }
// //   }
// // })

// server.listen('listening', () => {
//   console.log('Listenting on port: %d', port)
// })

// module.exports = app

// http://bbs.csdn.net/topics/392053314

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    next()
})

app.get('/', (req, res, next) => {
  res.send({
    code: 200,
    message: 'Welcome to Chat'
  })
})

io.on('connection', socket => {
  console.log('a user connected')

  // 给当前连接的用户发送信息
  socket
    .broadcast
    .emit('connection', '恭喜您, 您已经连接上了我们的聊天室了, 现在您可以开始聊天了')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', msg => {
    console.log(`message: ${msg}`)

    // 给每个连接的用户都发送消息
    io.emit('chat message', msg)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})