import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import BracketImage from '../Images/Fist-Graphic.jpg'

class BracketCard extends React.Component{

    render() {
        return (
            <Link key={this.props.bracket.id} to={`/brackets/${this.props.bracket.id}`}>
            <Card raised className='Bracket-card'>
                <Image src={BracketImage} wrapped ui={false} />
                <Card.Content>
                    <Card.Header >{this.props.bracket.name}</Card.Header>
                    <Card.Meta >Ran by: {this.props.bracket.user.username}</Card.Meta>
                    <Card.Description >
                    {this.props.bracket.desc}
                    </Card.Description>
                </Card.Content>
            </Card>
            </Link>
        )
    }
}

export default BracketCard