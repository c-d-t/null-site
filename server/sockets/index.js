let socketIO = require('socket.io')

let initRandomChatSockets = require('./random/randomChat')

function initSockets(server) {
    let io =  socketIO(server)

    initRandomChatSockets(io.of('./random/randomChat.js'))
}

module.exports = initSockets