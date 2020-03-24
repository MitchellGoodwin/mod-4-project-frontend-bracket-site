import React from 'react'
import EntrantsContainer from './EntrantsContainer'
import MatchContainer from './MatchContainer'
import { Button, Header } from 'semantic-ui-react'


class BracketShow extends React.Component{


    state = {
        bracket: [],
        entrants: [],
        user: ''
    }

    inBracket = () => {
        if (localStorage.getItem('user_id') && parseInt(localStorage.getItem('user_id')) !== this.state.bracket.user_id && this.state.bracket.status === 'pending') {
            let entries = this.state.entrants.filter(entry => entry.user.id === parseInt(localStorage.getItem('user_id')))
            return (entries.length > 0 ?
            <Button color='red' onClick={() => this.handleDeleteEntry(entries[0].id)}>Leave Tournament</Button> 
            : <Button color='green' onClick={this.handleMakeEntry}>Enter Tournament</Button>)
        }
    }

    renderOnStatus = () => {
        if (this.state.bracket.status === 'pending' && this.state.bracket.user.id === parseInt(localStorage.getItem('user_id'))) {
            return <Button onClick={this.handleChangeStatus} className='title' >Start Tournament</Button>
        } else if (this.state.bracket.status === 'started') {
            return <h2 className='title' >Tournament In Progress</h2>
        } else if (this.state.bracket.status === 'finished') {
            return <h2 className='title'>{`Tournament Winner: ${this.bracketWinner()}`}</h2>
        }
        
    }

    bracketWinner = () => {
        let winner = this.state.bracket.matches.sort((a, b) => { return b.round - a.round})[0]
        return (winner.winner ? winner.winner.username : null)
    }

    handleChangeStatus = () => {
        fetch(`http://localhost:3000/brackets/${this.state.bracket.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        },
        body: JSON.stringify({ status: 'started'})
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

    handleMakeEntry = () => {
        fetch('http://localhost:3000/entries',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        },
        body: JSON.stringify({ user_id: parseInt(localStorage.getItem('user_id')),
            bracket_id: this.state.bracket.id})
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

    handleDeleteEntry = (id) => {
        fetch(`http://localhost:3000/entries/${id}`,{
            method: 'DELETE',
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
                <Header className='title' size='huge'>{this.state.bracket.name}</Header>
                <Header className='title' sub >{this.state.bracket.desc}</Header>
                {this.inBracket()}
                <br/><br/>
                {this.renderOnStatus()}
                <br/><br/>
                <MatchContainer status={this.state.bracket.status} matches={this.state.bracket.matches} handleWinner={this.handleWinner}/>
                <EntrantsContainer status={this.state.bracket.status} handleDeleteEntry={this.handleDeleteEntry} user={this.state.bracket.user} entrants={this.state.entrants} handleSeedChange={this.handleSeedChange}/>
            </div>
        )
    }
}

export default BracketShow