import React, { Component } from 'react';
import './App.css';
import fire from './config/firebase';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Dashboard2 from "./Components/Dashboard2";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./routes/PublicRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import 'fontsource-roboto';
class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount()
  {
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }

  render(){
    
    const isAuthenticated = this.state.user;

    return (
      // <div className="App">
      //   {this.state.user ? (<Dashboard2/>) : (<SignInUp/>)}
      // </div>
      <Router>
          <Switch>
              <PublicRoute exact path='/login' component={SignIn} isAuthenticated={isAuthenticated} />
              <PublicRoute exact path='/register' component={SignUp} isAuthenticated={isAuthenticated} />
              <PrivateRoute exact path='/dashboard' component={Dashboard2}  isAuthenticated={isAuthenticated} />
              {/* <PrivateRoute exact path='/manage-products' component={ManageProfile}  isAuthenticated={isAuthenticated} />
              <PrivateRoute exact path='/manage-categories' component={ManageProfile}  isAuthenticated={isAuthenticated} /> */}
              <Redirect to={isAuthenticated ? '/dashboard' : '/login'} />
          </Switch>
      </Router>
    );
  }
}

export default App;