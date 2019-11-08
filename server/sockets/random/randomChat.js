function initRandomChatSockets(io) {
    io.on('connection', () => {
        console.log('connected')
    })

    
}

module.exports = initRandomChatSockets