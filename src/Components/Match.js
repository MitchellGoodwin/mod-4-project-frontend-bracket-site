import React from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'

const Match = (props) => {

    return(
        <Grid.Column style={{minWidth: 300}}>
            <Card centered >
                <Card.Content > 
                    <Card.Header >{props.finals? 'Finals' :  `Round: ${props.match.round}, Set: ${props.match.set}`}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button 
                            fluid
                            compact
                            color={props.match.user_one && props.match.winner && props.match.user_one.username === props.match.winner.username ? 'green' : 'grey'}
                            onClick={props.winner || !props.match.user_one || props.status !== 'started' || !props.match.user_two || !props.bracket_user ? null : () => props.handleWinner(props.match.user_one.id, props.match.id)}
                            >
                                {props.match.user_one ? props.match.user_one.username : 'pending'}
                        </Button>
                        <Button 
                            fluid 
                            compact
                            color={props.match.user_two && props.match.winner && props.match.user_two.username === props.match.winner.username ? 'green' : 'grey'}
                            onClick={props.winner || !props.match.user_two || !props.match.user_one || !localStorage.getItem('auth_token') ? null : () => props.handleWinner(props.match.user_two.id, props.match.id)}
                            >
                                {props.match.user_two ? props.match.user_two.username : 'pending'}
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}


export default Match