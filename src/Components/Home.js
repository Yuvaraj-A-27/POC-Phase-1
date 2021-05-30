import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

class Home extends React.Component{

    render(){
        return(
            <div className="Home-div">
                <Link to = '/register' className="Home-register">Register</Link>
                <Link to = '/login' className="Home-login" >Login</Link>
            </div>
        )
    }
}
export default Home;