import React from 'react'
import EntrantsContainer from './EntrantsContainer'
import MatchContainer from './MatchContainer'
import { Button, Header, Loader } from 'semantic-ui-react'
import { config } from '../Constants'

const URL = config.url.API_URL


class BracketShow extends React.Component{


    state = {
        bracket: [],
        entrants: [],
        loading: true,
    }

    inBracket = () => {
        if (this.props.user && this.props.user.id !== this.state.bracket.user_id && this.state.bracket.status === 'pending') {
            let entries = this.state.entrants.filter(entry => entry.user.id === this.props.user.id)
            return (entries.length > 0 ?
            <Button color='red' onClick={() => this.handleDeleteEntry(entries[0].id)}>Leave Tournament</Button> 
            : <Button color='green' onClick={this.handleMakeEntry}>Enter Tournament</Button>)
        }
    }

    renderOnStatus = () => {
        if (this.state.bracket.status === 'pending' && this.state.bracket.user.id === this.props.user.id) {
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
        this.setState({loading: true})
        fetch(`${URL}/brackets/${this.state.bracket.id}`,{
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
            }),
            loading: false    
        })
    })
    }

    handleMakeEntry = () => {
        this.setState({loading: true})
        fetch(URL + '/entries',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        },
        body: JSON.stringify({ user_id: this.props.user.id,
            bracket_id: this.state.bracket.id})
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                bracket: data,
                entrants: data.entries.sort((a, b) => {
                    return a.seed - b.seed;
                }),
                loading: false,    
            })
        })
    }

    handleDeleteEntry = (id) => {
        this.setState({loading: true})
        fetch(URL + `/entries/${id}`,{
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
                    }), 
                    loading: false    
                })
            })
    }

    componentDidMount() {
        fetch(`${URL}/brackets/${this.props.match.params.bracketID}`,{
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
            }),
            loading: false,    
        })
    })
    }

    handleSeedChange = (seed, id) => {
        this.setState({loading: true})
        fetch(`${URL}/entries/${id}`,{
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
            }),
            loading: false,
        }))
    }

    handleWinner = (winnerID, id) => {
        this.setState({loading: true})
        fetch(`${URL}/matches/${id}`,{
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
            }),
            loading: false
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
                <Loader  active={this.state.loading} size='massive'>
                </Loader>
                {!this.state.loading ? <>
                <MatchContainer 
                    status={this.state.bracket.status} 
                    bracket_user={this.props.user ? (this.props.user.id === this.state.bracket.user_id ? true : false) : false} 
                    matches={this.state.bracket.matches} 
                    handleWinner={this.handleWinner}
                    />
                <EntrantsContainer status={this.state.bracket.status} 
                    handleDeleteEntry={this.handleDeleteEntry} 
                        user={this.state.bracket.user} 
                            logged_user={this.props.user} 
                                entrants={this.state.entrants} 
                                    handleSeedChange={this.handleSeedChange}
                />
                </>
            : null}
            </div>
        )
    }
}

export default BracketShow