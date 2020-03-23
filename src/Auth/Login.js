import React, { Component } from 'react';

import { withRouter } from 'react-router';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }
    
    handleInput = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: this.state })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        localStorage.setItem('auth_token',data.jwt)
        this.props.handleLogin()
        this.props.history.push('/')
    })
    }

    render(){
        return (
        <span >
            <h2> Login </h2>
            <form onSubmit={this.handleSubmit}>
            <input type="text" name='username' placeholder="Username" onChange={this.handleInput} value={this.state.username} />
            <input type="password" name='password' placeholder="password" onChange={this.handleInput} value={this.state.password} />
            <input id="submit" type="submit" value="Submit" />
            </form>
        </span>
        )
    }
}

export default withRouter(Login);