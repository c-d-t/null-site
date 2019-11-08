import io from 'socket.io-client'

class RandomChatManager {
    socket = io('http://localhost:5000')
}