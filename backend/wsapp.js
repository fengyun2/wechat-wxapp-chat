const WebSocketServer = require('ws').Server,
    url = require('url'),
    wss = new WebSocketServer({
        port: 8000
    })

// 广播
wss.broadcast = function broadcast (data) {
    wss.clients.forEach(function each(client) {
        client.send(data)
    })
}

wss.on('connection', function (ws) {
    console.log('client connected')
        // ws.send(JSON.stringify({
        //     name: '云仔',
        //     age: 20,
        //     sex: 'man',
        //     address: '广州'
        // }))
    try {
        ws.send('something')

        wss.broadcast('something')
    } catch (err) {
        console.error('send error: ', err)
    }
    ws.on('message', function (message) {
        console.log('received: %s ', message)
    })

})