import React from 'react'
import { Card } from 'semantic-ui-react'

class BracketCard extends React.Component{

    render() {
        return (
            <Card>
                <Card.Header>{this.props.bracket.name}</Card.Header>
                <Card.Meta>Ran by: {this.props.bracket.user.username}</Card.Meta>
                <Card.Description>
                {this.props.bracket.desc}
                </Card.Description>
            </Card>
        )
    }
}

export default BracketCard