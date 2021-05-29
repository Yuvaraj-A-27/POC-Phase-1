import React from 'react';
import CreateUser from './CreateUser';
import './DashBoard.css'
import Root from './Root'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : 13,
            firstName : "",
            lastName :"",
            email : "",
            job:"",
            avatar : "https://www.x-innovations.se/wp-content/uploads/dummy-prod-1.jpg",
            userDetail : [],
            currentUserPag : 1,
        }
    }

    firstNameHandler = (event) => {
        event.preventDefault();
        this.setState({
            firstName : event.target.value,
        })
    }

    logOutHandler =(event)=>{
        event.preventDefault()
        sessionStorage.removeItem("userName")
        this.props.history.push("/")
    }

    currentUserPagHandler = (id,event) =>{
        event.preventDefault()
        this.setState({
            currentUserPag :id
        })
    }

    componentDidMount(){
        fetch("https://reqres.in/api/users")   //for first 6 users
        .then((res) => {
            return res.json()
        })
        .then((data) =>{
            const list = [...data.data]
            this.setState({
                userDetail : list
            })
        })
        fetch("https://reqres.in/api/users?page=2")   //for second 6 users
        .then((res) =>{ 
           return res.json()
        })
        .then((data) => {
            let list = [...this.state.userDetail]
            list.push(...data.data)
            this.setState({
                userDetail : list,
            })
        })
    }
    
    render(){
        // console.log(this.state.userDetail);
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
                    <CreateUser stateData = {this.state}
                    firstNameHandler = {this.firstNameHandler} />
                </div>
                <div className="main-div">
                    <h4 className="main-div-h4">User Profiles</h4>
                    <Root className="" 
                    userDetail = {this.state.userDetail} 
                    currentUserPag = {this.state.currentUserPag}
                    currentUserPagHandler = {this.currentUserPagHandler}
                    />
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