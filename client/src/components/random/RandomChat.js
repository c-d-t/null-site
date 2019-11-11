import React, { Component } from 'react'
import Timeago from 'react-timeago'
import io from 'socket.io-client'

import './RandomChat.css'

class RandomChat extends Component {
    socket = io('http://localhost:5000/random')

    state = {
        roomID: '',
        text: '',
        alone: false,
        messages:  []
    }

    componentDidMount() {
        this.initSockets()
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    // get in queue for a match
    startMatch = () => {
        document.getElementById("random-text").focus()
        this.socket.emit('joinRoom')
        this.setState({
            messages: [{
                authorType: 'moderator',
                content: 'Looking for partner...'
            }],
            alone: false
        })
    }

    initSockets = () => {
        this.startMatch()

        // get room id and introduce name to other player //
        this.socket.on('start', data => {
            this.setState({
                roomID: data.roomID
            })
            this.socket.emit('introduction', { nickname: this.getNickname()})
        })

        this.socket.on('finish', () => {
            this.setState({
                alone: true
            })
        })

        // get message and add to state
        this.socket.on('receiveMessage', data => {
            let div = document.getElementById('random-messages')
            let isAtBottom = (div.scrollTop + div.clientHeight === div.scrollHeight )
            let newMessage  = null
            if (data.authorType === 'moderator') {
                newMessage = {
                    authorType: 'moderator',
                    content: [data.content]
                }
            } else {
                let authorType = (data.author === this.getNickname()) ? 'this-user' : 'other-user'
                newMessage = {
                    author: data.author,
                    authorType: authorType,
                    content: [data.content],
                    timestamp: data.timestamp,
                }
            }

            // if last message is from the same person and in the same hour, combine it
            let lastMessage = this.state.messages[this.state.messages.length - 1]
            let lastMessageIndex = this.state.messages.findIndex(message => message === lastMessage)
            if (newMessage.authorType === lastMessage.authorType && Date.now() - lastMessage.timestamp <= 60000) {
                let messages = [...this.state.messages]
                let message = {
                    ...messages[lastMessageIndex],
                    content: [...lastMessage.content, data.content]
                }
                messages[lastMessageIndex] = message

                this.setState({
                    messages
                })
            } else {
                this.setState(prevState => ({
                    messages: [...prevState.messages, newMessage]
                }))
            }
            if (isAtBottom) {
                div.scrollTop = div.scrollHeight
            }
        })
    }

    getNickname = () => {
        // TODO: clean name
        if (sessionStorage.getItem("nickname") === null) {
            sessionStorage.setItem("nickname", "Stranger")
        }
        return sessionStorage.getItem("nickname")
    }

    // send socket with data (author name, content, and timestamp)
    submitBtn = () => {
        document.getElementById("random-text").focus()
        let timestamp = Date.now()
        this.socket.emit('sendMessage', { roomID: this.state.roomID, author: this.getNickname(), content: this.state.text, timestamp })
        this.setState({text: ''})
    }

    updateText = e => {
        let key = e.target.name
        let value = e.target.value
        this.setState({
            [key]: value
        })
    }

    onTextKeyDown = e => {
        if (e.key === 'Enter') {
            this.submitBtn()
        }
    }

    timeFormatter = (value, unit, suffix) => {
        if (unit === 'second') {
            return 'now'
        }
        if (value === 1) {
            return `${value} ${unit} ${suffix}`
        } else {
            return `${value} ${unit}s ${suffix}`
        }
    }

    render() {
        return  (
            <div className="container">
                <div id="random-chat-container">
                    <ul id="random-messages">
                        {this.state.messages.map((message, i) => {
                            if (message.authorType === 'moderator') {
                                return (
                                    <li className="moderator" key={i}>
                                        <div className="message">
                                            <div className="message-content">
                                                {message.content}
                                            </div>
                                        </div>
                                    </li>
                                )
                            } else {
                                return (
                                    <li className={message.authorType} key={i}>
                                        <div className="message">
                                            <div className="message-bubble">
                                                <div className="message-author">
                                                    {message.author}
                                                </div>
                                                {message.content.map((content, i) => (
                                                    <div className="message-content" key={i}>{content}</div>
                                                ))}
                                            </div>
                                            <div className="message-timestamp">
                                                <Timeago date={message.timestamp} formatter={this.timeFormatter} minPeriod={60} />
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                    <div id="random-input">
                        <input
                            id="random-text"
                            name="text"
                            type="text"
                            autoComplete="off"
                            placeholder="Type something..."
                            value={this.state.text}
                            onChange={this.updateText}
                            onKeyDown={this.onTextKeyDown} />
                        <button
                            id="random-submit"
                            type="button"
                            onClick={this.state.alone ? this.startMatch : this.submitBtn}>
                                {this.state.alone ? 'New' : 'Send'}
                                </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RandomChat