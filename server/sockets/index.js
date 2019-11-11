let socketIO = require('socket.io')

let initRandomChatSockets = require('./randomChat')
let initGroupChatSockets = require('./groupChat')

function initSockets(server) {
    let io =  socketIO(server)

    initRandomChatSockets(io.of('/random'))
    initGroupChatSockets(io.of('/group'))
}

module.exports = initSockets