import React from 'react'
import { Grid } from 'semantic-ui-react'
import Round from './Round'

class MatchContainer extends React.Component{
    

    render() {

        const rounds = () => {
            let roundnums = this.props.matches.map(match => match.round)
            roundnums = [...new Set(roundnums)]
            let round = roundnums.map(num => this.props.matches.filter(match => match.round === num))
            round.sort()
            return round
        }

        return(
            <div className='Match-wrapper'>
                <Grid centered className='Match-container' >
                    {this.props.matches ? rounds().map(round => <Round status={this.props.status} handleWinner={this.props.handleWinner} key={round[0].round} matches={round}/>) : null}
                </Grid>
            </div>
        )
    }
}

export default MatchContainer