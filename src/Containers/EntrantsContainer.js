import React from 'react'
import { Table } from 'semantic-ui-react'
import Entrant from '../Components/Entrant'

class EntrantsContainer extends React.Component{

    

    render(){
        const seedRange = this.props.entrants ? this.props.entrants.map(entrant => entrant.seed) : []

        return(
            <Table inverted selectable striped celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Competitor Rank</Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Change Seed</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.entrants.map(entrant => <Entrant status={this.props.status} handleDeleteEntry={this.props.handleDeleteEntry} user={this.props.user} logged_user={this.props.logged_user} entrant={entrant} key={entrant.id} seedRange={seedRange} handleSeedChange={this.props.handleSeedChange}/>)}
                </Table.Body>

            </Table>
        )
    }
}

export default EntrantsContainer