import React from 'react'
import { Grid } from 'semantic-ui-react'
import Match from '../Components/Match'

class Round extends React.Component{


    render(){
        return (
            <Grid.Row centered >
                {this.props.matches.filter(match => match.round > 1 || (match.user_one && match.user_two)).map(match => <Match handleWinner={this.props.handleWinner} key={match.id} match={match}/>)}
            </Grid.Row>
        )
    }
}

export default Round