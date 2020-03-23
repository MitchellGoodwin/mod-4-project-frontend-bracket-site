import React from 'react'
import BracketCard from '../Components/BracketCard'
import { Card } from 'semantic-ui-react'

class Brackets extends React.Component {

    state = {
        brackets: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/brackets',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // 'Access-Token': localStorage.getItem('auth_token')
        }
        })
        .then(res => res.json())
        .then(data => this.setState({ brackets: data.brackets }))
    }


    render() {
        return (
            <Card.Group>
                {this.state.brackets.map(bracket => <BracketCard key={bracket.id} bracket={bracket}/>)}
            </Card.Group>
        )
    }
}

export default Brackets