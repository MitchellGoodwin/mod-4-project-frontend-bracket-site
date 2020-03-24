import React from 'react'
import { Table, Dropdown, Button } from 'semantic-ui-react'

class Entrant extends React.Component{


    render() {
        return(
            <Table.Row>
                <Table.Cell>
                    {this.props.entrant.seed}
                </Table.Cell>
                <Table.Cell>{this.props.entrant.user.username}</Table.Cell>
                <Table.Cell>
                    {this.props.status === 'pending' ?
                    this.props.user.id === parseInt(localStorage.getItem('user_id')) ? 
                        <div>
                        <Dropdown value={this.props.entrant.seed} text={this.props.entrant.seed}>
                            <Dropdown.Menu onChange={this.props.handleSeedChange}>
                                {this.props.seedRange.map(seed => <Dropdown.Item onClick={() => this.props.handleSeedChange(seed, this.props.entrant.id)} key={seed} value={seed}>{seed}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button color='red' floated='right' onClick={() => this.props.handleDeleteEntry(this.props.entrant.id)}>Kick Competitor</Button>
                        </div>
                        : this.props.entrant.seed
                    : 'Tournament Started'}
                </Table.Cell>
            </Table.Row>
        )
    }


}


export default Entrant