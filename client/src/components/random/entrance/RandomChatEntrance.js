import React, { Component } from 'react'
import './RandomChatEntrance.css'

class RandomFront extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
        }
    }

    componentDidMount() {
        document.getElementById('i').focus()
        
    }

    updateText = e => {
        let key = e.target.name
        let value = e.target.value
        
        // weak clean
        value = value.replace(/[^0-9a-z]/gi, '')
        value = value.slice(0,15)

        this.setState({
            [key]: value
        })
    }

    submitBtn = () => {
        if (this.state.nickname === '') {
            document.getElementById('i').placeholder = 'A nickname is required'
            return
        }

        document.cookie = `nickname=${this.state.nickname}; path="/random"`

        // TODO: clean name

        window.location.pathname = '/random/chat'
    }

    render() {
        return (
            <div className="container">
                <div id="random-form">
                    <h2 className="form-field">Random Chat</h2>
                    <input
                        id="i"
                        className="text-field"
                        name="nickname"
                        type="text"
                        placeholder="Nickname"
                        autoComplete="off"
                        value={this.state.nickname}
                        onChange={this.updateText} />
                    <button
                        className="button-submit"
                        type="button"
                        onClick={this.submitBtn}>
                        Join
                    </button>
                </div>
            </div>
        )
    }
}

export default RandomFront