import React, { Component } from 'react'
import io from 'socket.io-client'

import './RandomChat.css'

class RandomChat extends Component {
    socket = io('http://localhost:5000/random')

    state = {
        roomID: '',
        text: '',
        messages:  []
    }

    componentDidMount() {
        document.getElementById("random-text").focus()
        this.initSockets()
    }

    componentWillUnmount() {

    }

    initSockets = () => {
        // get in queue //
        this.socket.emit('joinRoom')

        // get room id and introduce name to other player //
        this.socket.on('start', data => {
            this.setState({
                roomID: data.roomID
            })
            this.socket.emit('introduction', { nickname: this.getNickname()})
        })

        // get message and add to state
        this.socket.on('message', data => {
            let newMessage = {
                author: data.author,
                content: data.content,
                timeStamp: data.timeStamp,
            }
            this.setState(prevState => ({
                messages: [...prevState, newMessage]
            }))
        })
    }

    getNickname = () => {
        // TODO: clean name
        return sessionStorage.getItem("nickname")
    }

    submitBtn = () => {
        this.setState({text: ''})
    }

    updateText = e => {
        let key = e.target.name
        let value = e.target.value
        this.setState({
            [key]: value
        })
    }

    render() {
        return  (
            <div className="container">
                <div id="random-chat-container">
                    <ul id="random-messages">
                        <li><div className="message-author">bobbette</div><div className="message-content">Hi there bud bud buddy</div><div className="message-timestamp">a few minutes ago</div></li>

                        {this.state.messages.map((data, i) => {
                            return (
                                <li key={i}><span>{data.author}:</span>{data.content}</li>
                            )
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
                            onChange={this.updateText} />
                        <button
                            id="random-submit"
                            type="button"
                            onClick={this.submitBtn}>Send</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RandomChat