import React, { Component } from 'react'

import './RandomChat.css'

class RandomChat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            messages:  []
        }
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
                    <li><span>guy:</span>hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>guy:</span>hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>guy:</span>hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>guy:</span>hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>guy:</span>hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>guy:</span>hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>guy:</span>hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>
                    <li><span>more guy:</span>more hi</li>

                        {this.state.messages.map((data, i) => {
                            return (
                                <li key={i}><span>{data.author}:</span>{data.message}</li>
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