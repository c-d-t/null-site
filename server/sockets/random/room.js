class Room {
    messages = []

    constructor(id) {
        this.roomID = id
    }
}

class Message {
    constructor(author, content, type) {
        this.author = author
        this.content = content
        this.type = type
    }
}