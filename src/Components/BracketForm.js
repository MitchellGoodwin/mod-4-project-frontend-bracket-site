import React from 'react'
import { Button, Form } from 'semantic-ui-react'

import { withRouter } from 'react-router';

class BracketForm extends React.Component{

    state = {
        name: '',
        desc: ''
    }
    
    handleInput = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/brackets',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        },
        body: JSON.stringify({ bracket: this.state })
    })
    .then(res => res.json())
    .then(data => {
        
        this.props.history.push(`/brackets/${data.id}`)
    })
    }

    render() {
        return(
            <div>
                <h1>Make Your New Bracket</h1>
                <Form onSubmit={this.handleSubmit}>
                    <input type="text" name='name' placeholder="Bracket Name" onChange={this.handleInput} value={this.state.name} /><br/>
                    <textarea name='desc' placeholder="Add a Description" rows='10' cols='50' onChange={this.handleInput} value={this.state.desc} /><br/>
                    <Button id="submit" type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(BracketForm)