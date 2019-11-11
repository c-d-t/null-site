import React, {  useState, useEffect } from 'react'
import Timeago from 'react-timeago'
import io from 'socket.io-client'

import './GroupChat.css'

let socket = io('http://localhost:5000/group')

function GroupChat() {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState('')

    useEffect(() => {
        // unmount
        return () => {
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        // mount
        socket.on('receiveMessage', data => {
            let newMessage = {
                author: data.author,
                content: [data.content],
                timestamp: data.timestamp
            }
            // if last message is from the same person and in the same hour, combine it
            let lastMessage = messages[messages.length - 1]
            let lastMessageIndex = messages.findIndex(message => message === lastMessage)
            if (lastMessageIndex >= 0 && newMessage.author === lastMessage.author && Date.now() - lastMessage.timestamp <= 60000) {
                let _messages = [...messages]
                let message = {
                    ..._messages[lastMessageIndex],
                    content: [...lastMessage.content, data.content]
                }
                _messages[lastMessageIndex] = message

                setMessages(_messages)
            } else {
                setMessages(messages => [...messages, newMessage])
            }
        })
        return () => { 
            socket.off('receiveMessage')
        }
    }, [messages])

    function submitText() {
        // sends text through socket
        let nickname = sessionStorage.getItem("nickname")
        let timestamp = Date.now()
        socket.emit('sendMessage', { author: nickname, content: text,  timestamp })
        setText('')
    }
    function textKeyDown(e) {
        if (e.key === 'Enter') {
            submitText()
        }
    }

    function timeFormatter(value, unit, suffix) {
        if (unit === 'second') {
            return 'now'
        }
        if (value === 1) {
            return `${value} ${unit} ${suffix}`
        } else {
            return `${value} ${unit}s ${suffix}`
        }
    }

    return (
        <div id="group-container">
            <div id="group-main">
                <ul id="group-messages">
                    {messages.map((message, i) => (
                        <li key={i}>
                            <div className="group-message">
                                <div className="group-message-bubble">
                                    <div className="group-message-meta">
                                        <span className="group-message-author">
                                            {message.author}
                                        </span>
                                        <span className="group-message-timestamp">
                                            <Timeago date={message.timestamp} formatter={timeFormatter} />
                                        </span>
                                    </div>
                                    <div className="group-message-content">
                                        {message.content.map((content, i) => (
                                            <div key={i}>{content}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div id="group-input">
                    <input
                        id="group-text"
                        type="text"
                        placeholder="Type something..."
                        value={text}
                        autoComplete="off"
                        onChange={e => setText(e.target.value)}
                        onKeyDown={textKeyDown} />
                    <button
                        id="group-submit"
                        type="button"
                        onClick={submitText}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GroupChat