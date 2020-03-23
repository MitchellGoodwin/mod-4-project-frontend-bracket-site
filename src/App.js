import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import NavBar from './Components/NavBar'
import Brackets from './Containers/Brackets'
import BracketShow from './Containers/BracketShow'

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
    logged_in: false
  }

  handleLogin = () => {
    this.setState({ logged_in: true })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({ logged_in: false })
  }

  render() {
    return (
      <Router > 
        <NavBar />

        <Switch>

          <Route exact path='/' component={() => {
            return <CheckLogin component={Brackets} />
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
