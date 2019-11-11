function initGroupChatSockets(io) {
    io.on('connection', socket => {
        console.log('** group chat client connected to socket **')

        socket.on('sendMessage', data => {
            io.emit('receiveMessage', data)
        })

        socket.on('disconnect', () => {
            console.log('** group chat client disconnected **')
        })
    })
}

module.exports = initGroupChatSockets