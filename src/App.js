import React from 'react';
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/DashBoard';
import Home from './Components/Home';
import styled from 'styled-components';

const MainDiv = styled.div `
  text-align: center;
`

function App(){
  let history = useHistory()
  
  return(
    <>
      <Router>
          <Switch>
              <MainDiv>
                <Route path="/" exact  component={Home} />
                <Route path="/register"  component={Register} />
                <Route path="/login"  component={Login}  />
                <Route path="/dashboard"  component={Dashboard} /> 
              </MainDiv>  
          </Switch>
      </Router>
    </>
  );
}


export default App;