import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import './RandomChatEntrance.css'

class RandomFront extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: '',
            redirect: false
        }
    }

    componentDidMount() {
        document.getElementById('i').focus()
    }

    updateText = e => {
        let key = e.target.name
        let value = e.target.value
        
        // soft clean
        value = value.replace(/[^0-9a-z]/gi, '')
        value = value.slice(0,15)

        this.setState({
            [key]: value
        })
    }

    submitBtn = (e) => {
        e.preventDefault()
        if (this.state.nickname === '') {
            document.getElementById('i').placeholder = 'A nickname is required'
            return
        }

        this.addName(this.state.nickname)

        this.setState({
            redirect: true
        })
    }

    addName = (nickname) => {
        sessionStorage.setItem("nickname", nickname)
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/random/chat" />
        }

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