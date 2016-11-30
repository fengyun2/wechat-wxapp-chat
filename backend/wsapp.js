const WebSocketServer = require('ws').Server,
    url = require('url'),
    wss = new WebSocketServer({
        port: 8000
    })

// 广播
wss.broadcast = function broadcast (type = 1, ws) {
    wss.clients.forEach(function each(client) {
        switch (type) {
            case 1: {
                client.send(ws.name + ': '+ ws.msg)
                break
            }
            case 0: {
                client.send(ws + '退出聊天室')
            }
        }
    })
}

wss.on('connection', function (ws) {
    console.log('client connected')
    console.log(`您是第 ${wss.clients.length} 位`)
    ws.send(`您是第 ${wss.clients.length} 位`)
    try {
        wss.broadcast(JSON.stringify({
            name: '云仔',
            age: 20,
            sex: 'man',
            address: '广州'
        }))

    } catch (err) {
        console.error('send error: ', err)
    }
    // 接受信息/发送
    ws.on('message', function (json) {
        // console.log('received: %s ', message)
        const obj = JSON.parse(json)
        this.user = obj
        if (typeof this.user.msg != 'undefined') {
            wss.broadcast(1, obj)
        }
    })
    // 退出聊天
    ws.on('close', function () {
        try {
            wss.broadcast(0, this.user.name)
        } catch (e) {
            console.log('刷新页面了')
        }
    })


})