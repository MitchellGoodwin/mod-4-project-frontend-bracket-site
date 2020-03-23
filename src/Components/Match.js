import React from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'

const Match = (props) => {

    return(
        <Grid.Column style={{minWidth: 400}}>
            <Card>
                <Card.Content> 
                    <Card.Header>{`Round: ${props.match.round}, Set: ${props.match.set}`}</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button 
                            basic 
                            color={props.match.user_one && props.match.winner && props.match.user_one.username === props.match.winner.username ? 'green' : 'grey'}
                            onClick={props.winner || !props.match.user_one || !props.match.user_two ? null : () => props.handleWinner(props.match.user_one.id, props.match.id)}
                            >
                                {props.match.user_one ? props.match.user_one.username : 'Waiting For Winner'}
                        </Button>
                        <Button 
                            basic 
                            color={props.match.user_two && props.match.winner && props.match.user_two.username === props.match.winner.username ? 'green' : 'grey'}
                            onClick={props.winner || !props.match.user_two || !props.match.user_one ? null : () => props.handleWinner(props.match.user_two.id, props.match.id)}
                            >
                                {props.match.user_two ? props.match.user_two.username : 'Waiting For Winner'}
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}


export default Match