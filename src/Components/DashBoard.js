import React from 'react';
import './DashBoard.css'
import Root from './Root'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userDetail : [],
        }
    }

    logOutHandler =()=>{
        sessionStorage.removeItem("userName")
        this.props.history.push("/")
    }
    
    render(){
        const userName = sessionStorage.getItem("userName");
        if(sessionStorage.getItem("userName") !==null){
            return(
                <>
                <div>
                    <p className="welcome">Hello {userName}!</p>
                    <p onClick = {this.logOutHandler} className="logout-btn">Log out</p>
                </div>
                <div className="left-div">
                    <h4 className="left-div-h4">Create new user</h4>
                    
                </div>
                <div className="main-div">
                    <h4 className="main-div-h4">User Profiles</h4>
                    <Root className=""/>
                </div>
                </>
            )
        }
        else{
            return(
                <>
                    <p>Please Log in</p>
                </>
            )
        }
    }
}

export default Dashboard;