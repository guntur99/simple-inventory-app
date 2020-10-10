import React, { Component } from 'react';
import './App.css';
import fire from './config/firebase';
import SignInUp from './Components/SignInUp';
import Dashboard from './Components/Dashboard';
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
    return (
      <div className="App">
        {this.state.user ? (<Dashboard/>) : (<SignInUp/>)}
      </div>
    );
  }
}

export default App;