import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class BracketCard extends React.Component{

    render() {
        return (
            <Link key={this.props.bracket.id} to={`/brackets/${this.props.bracket.id}`}>
            <Card className='Bracket-card'>
                <Card.Header >{this.props.bracket.name}</Card.Header>
                <Card.Meta>Ran by: {this.props.bracket.user.username}</Card.Meta>
                <Card.Description>
                {this.props.bracket.desc}
                </Card.Description>
            </Card>
            </Link>
        )
    }
}

export default BracketCard