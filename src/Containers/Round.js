import React from 'react'
import { Grid } from 'semantic-ui-react'
import Match from '../Components/Match'

class Round extends React.Component{



    render(){

        const sortedMatches = this.props.matches.sort(function (a, b) {
            return a.set - b.set;
        });

        return (
            <Grid.Row centered >
                {sortedMatches.filter(match => match.round > 1 || (match.user_one && match.user_two)).map(match => <Match status={this.props.status} handleWinner={this.props.handleWinner} key={match.id} match={match}/>)}
            </Grid.Row>
        )
    }
}

export default Round