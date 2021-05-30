import React from 'react';
// import Navbar from './Components/Navbar';
import './App.css'
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/DashBoard';
import Home from './Components/Home';


function App(){
  let history = useHistory()
  
  return(
    <>
      <Router>
          {/* <div>
              <Navbar/>
          </div> */}
          <Switch>
              <div className="MainContent">
                <Route path="/" exact history = {history} component={Home} />
                <Route path="/register"  history = {history} component={Register} />
                <Route path="/login" history = {history} component={Login}  />
                <Route path="/dashboard" history = {history} component={Dashboard} /> 
              </div>  
          </Switch>
      </Router>
    </>
  );
}


export default App;