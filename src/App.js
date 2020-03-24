import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import NavBar from './Components/NavBar'
import Brackets from './Containers/Brackets'
import BracketShow from './Containers/BracketShow'
import BracketForm from './Components/BracketForm'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import CheckLogin from './Auth/CheckLogin';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';

class App extends React.Component {

  state = {
    logged_user: false,
  }

  handleLogin = (user) => {
    this.setState({ logged_user: user })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({ logged_user: false })
  }

  componentDidMount = () => {
    if (localStorage.getItem('auth_token')) {
      fetch(`http://localhost:3000/current`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('auth_token')
        }
        })
        .then(res => res.json())
        .then(user => this.setState({ logged_user: user }))
    }
  }

  render() {
    return (
      <Router > 
        <NavBar />

        <Switch>

          <Route exact path='/' component={() => {
            return <Brackets />
          }} />
          
          <Route exact path='/login' component={() => {
            return <Login handleLogin={this.handleLogin} />
          }} />

          <Route exact path='/signup' component={() => {
            return <SignUp handleLogin={this.handleLogin} />
          }} />

          <Route exact path='/logout' component={() => {
            this.handleLogout()
            return <Redirect to='/login' />
          }} />

          <Route exact path='/brackets/new' component={() => {
            return <CheckLogin component={BracketForm} />
          }} />

          <Route path='/brackets/:bracketID' render={routerProps => <BracketShow {...routerProps} /> }/>
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
      )
  }

}
export default App;
