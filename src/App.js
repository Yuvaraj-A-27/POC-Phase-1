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
                <Route path="/" exact  component={Home} />
                <Route path="/register"  component={Register} />
                <Route path="/login"  component={Login}  />
                <Route path="/dashboard"  component={Dashboard} /> 
              </div>  
          </Switch>
      </Router>
    </>
  );
}


export default App;