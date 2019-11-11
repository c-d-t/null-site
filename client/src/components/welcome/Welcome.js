import React, { Component } from 'react'

import './Welcome.css'

class Welcome extends Component {
    state = {
        nickname: '',
    }

    componentDidMount() {
        document.getElementById('i').focus()
    }

    updateText = e => {
        let key = e.target.name
        let value = e.target.value
        
        // soft clean
        value = value.replace(/[^0-9a-z]/gi, '')
        value = value.slice(0,20)

        this.setState({
            [key]: value
        })
    }

    submitBtn = () => {
        if (this.state.nickname === '') {
            document.getElementById('i').placeholder = 'A nickname is required'
            return
        }

        sessionStorage.setItem("nickname", this.state.nickname)
        this.props.tempLogin()
    }

    textKeyDown = e => {
        if (e.key === 'Enter') {
            this.submitBtn()
        }
    }

    render() {
        return (
            <div className="container">
                <div id="random-form">
                    <h2 className="form-field">Your Nickname (At the moment, if you want to change this, you need to open a new tab)</h2>
                    <input
                        id="i"
                        className="text-field"
                        name="nickname"
                        type="text"
                        placeholder="Nickname"
                        autoComplete="off"
                        value={this.state.nickname}
                        onChange={this.updateText}
                        onKeyDown={this.textKeyDown} />
                    <button
                        className="button-submit"
                        type="button"
                        onClick={this.submitBtn}>
                        Begin!
                    </button>
                </div>
            </div>
        )
    }
}

export default Welcome