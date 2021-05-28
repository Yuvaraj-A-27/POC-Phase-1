import React from 'react';
import { Link } from 'react-router-dom';
// import {logOutFunct} from '../util/logOutFunct';
import './Navbar.css'


class Navbar extends React.Component{

    logOutHandler =() =>{
        sessionStorage.removeItem("userName");
        // this.props.history.push("/");
    }

    render(){
        return(
            <>
                <nav className="nav">
                    <div className = "link-div" >
                    { sessionStorage.getItem("userName") ===null &&
                    <>
                        <Link className = "link" to="/register">Register</Link>
                        <Link className = "link" to="/login">Login</Link>
                    </>
                    }
                    </div>
                </nav>
                <nav className="nav2" />
            </>
        )
    }
}

export default Navbar;