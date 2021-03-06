import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { config } from '../Constants'

import { withRouter } from 'react-router';

const URL = config.url.API_URL

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

    fetch(URL + '/login',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: this.state })
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('auth_token',data.jwt)
        this.props.handleLogin(data.user)
        this.props.history.push('/')
    })
    }

    render(){
        return (
        <span className='form-tag'>
            <h2> Login </h2>
            <Form onSubmit={this.handleSubmit}>
                <Segment inverted raised size='large'>
                    <Form.Field>
                        <input type="text" 
                            name='username' 
                                placeholder="Username" 
                                    onChange={this.handleInput}  
                                        value={this.state.username} />
                    </Form.Field>
                    <Form.Field>
                        <input type="password" 
                            name='password' 
                                placeholder="password" 
                                    onChange={this.handleInput} 
                                        value={this.state.password} />
                    </Form.Field>

                    <Button type='submit'>Submit</Button>
                </Segment>
            </Form>
        </span>
        )
    }
}

export default withRouter(Login);