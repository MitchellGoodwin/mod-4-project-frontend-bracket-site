import React from 'react'
import BracketCard from '../Components/BracketCard'
import { Card, Header } from 'semantic-ui-react'
import { config } from '../Constants'

const URL = config.url.API_URL

class Brackets extends React.Component {

    state = {
        brackets: []
    }

    componentDidMount() {
        fetch(URL + "/brackets",{
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
            <div>
                <Header className='title' size='huge'>Find an Event</Header>
                <Card.Group>
                    {this.state.brackets.map(bracket => <BracketCard key={bracket.id} bracket={bracket}/>)}
                </Card.Group>
            </div>
        )
    }
}

export default Brackets