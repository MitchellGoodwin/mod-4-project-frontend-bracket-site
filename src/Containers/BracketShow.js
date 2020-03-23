import React from 'react'
import EntrantsContainer from './EntrantsContainer'
import MatchContainer from './MatchContainer'



class BracketShow extends React.Component{


    state = {
        bracket: [],
        entrants: [],
        user: ''
    }

    componentDidMount() {
        fetch(`http://localhost:3000/brackets/${this.props.match.params.bracketID}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
            bracket: data,
            entrants: data.entries.sort((a, b) => {
                return a.seed - b.seed;
            })    
        })
    })
    }

    handleSeedChange = (seed, id) => {
        fetch(`http://localhost:3000/entries/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        },
        body: JSON.stringify({seed: seed, id: id}),
        })
        .then(res => res.json())
        .then(data => this.setState({
            bracket: data,
            entrants: data.entries.sort((a, b) => {
                return a.seed - b.seed;
            })
        }))
    }

    handleWinner = (winnerID, id) => {
        fetch(`http://localhost:3000/matches/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        },
        body: JSON.stringify({winnerID: winnerID, id: id}),
        })
        .then(res => res.json())
        .then(data => this.setState({
            bracket: data,
            entrants: data.entries.sort((a, b) => {
                return a.seed - b.seed;
            })
        }))
    }

    render() {
        return (
            <div>
                <h1>{this.state.bracket.name}</h1>
                <MatchContainer matches={this.state.bracket.matches} handleWinner={this.handleWinner}/>
                <EntrantsContainer status={this.state.bracket.status} user={this.state.bracket.user} entrants={this.state.entrants} handleSeedChange={this.handleSeedChange}/>
            </div>
        )
    }
}

export default BracketShow