import React from 'react'
import { Header, Segment, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const RenderLoggedIn = () => {
    return (
        <Menu>
            <Menu.Item
            name='logout'
            >
                <Link to='/logout'>
                    Logout
                </Link>
            </Menu.Item>
        </Menu>
    )
}

const RenderLoggedOut = () => {
    return (
        <Menu>
            <Menu.Item
                name='login'
                >
                    <Link to='/login'>
                        Login
                    </Link>
                </Menu.Item>

                <Menu.Item
                name='signup'
                >
                    <Link to='/signup'>
                        Signup
                    </Link>
                </Menu.Item>
        </Menu>
    )
}

const NavBar = () => (
    <Segment clearing>
        <Header as='h1' floated='left'>
            PlaceholderName
        </Header>
        <Header floated='right'>
            {localStorage.getItem('auth_token') ?
                RenderLoggedIn()
                : RenderLoggedOut()}
        </Header>
    </Segment>
)

export default NavBar
