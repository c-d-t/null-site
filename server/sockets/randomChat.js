let uuid = require('uuid/v1')

let rooms =  []

function initRandomChatSockets(io) {
    io.on('connection', socket => {
        console.log('** random chat client connected to socket **')

        // when a user joins the random chat, check if there is another user waiting. 
        // if there is, join their room
        // if no, create a new room and wait for another user to join
        socket.on('joinRoom', () => {
            let availableRoom = rooms.filter(room => !room.isFull)
            if (availableRoom.length >= 1) {
                // add socket to available room
                console.log('and theyre together now')
                availableRoom[0].isFull = true
                let roomID = availableRoom[0].roomID
                socket.join(roomID)
                socket.roomID = roomID
                io.in(roomID).emit('start', { roomID })
            } else {
                // no available room so create one
                let roomID = uuid()
                rooms.push({ roomID, isFull: false })
                socket.roomID = roomID
                socket.join(roomID)
            }
            console.log(rooms)
        })

        socket.on('introduction', data => {
            socket.broadcast.to(socket.roomID).emit('receiveMessage', { authorType: 'moderator', content: `You've connected with ${data.nickname}, say hi!` })
        })

        // when a user sends a message, emit it to all users in the same room and pass the data
        socket.on('sendMessage', data => {
            io.in(data.roomID).emit('receiveMessage', data)
        })

        // when a user disconnects, if another user was talking in their room, are notified
        // remove room from room list
        socket.on('disconnect', () => {
            console.log('** random chat client disconnected from socket **')
            let roomIndex = rooms.findIndex(room => room.roomID === socket.roomID)
            if (roomIndex >= 0) {
                if (rooms[roomIndex].isFull) {
                    io.in(rooms[roomIndex].roomID).emit('receiveMessage', { authorType: 'moderator', content: 'Your partner has left. Click \'new\' to start a new converation'})
                    io.in(rooms[roomIndex].roomID).emit('finish')
                }
                rooms.splice(roomIndex, 1)
            }
        })
    })
}

module.exports = initRandomChatSockets