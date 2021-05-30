import axios from 'axios';
import React from 'react';
import CreateUser from './CreateUser';
import './DashBoard.css'
import DeleteUser from './DeleteUser';
import Root from './Root'
import UpdateUser from './UpdateUser';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : 0,
            firstName : "",
            lastName :"",
            email : "",
            job:"",
            avatar : "https://www.x-innovations.se/wp-content/uploads/dummy-prod-1.jpg",
            userDetail : [],
            currentUserPag : 1,
            componentDidMountHappened : false,
            createUserToggle : false,
            updateUserToggle : false,
            deleteUserToggle : false,
        }
    }

    createUserHandler = (event) => {
        event.preventDefault()
        let data = {
            id : this.state.userDetail.length + 1,
            email : this.state.email,
            first_name : this.state.firstName,
            last_name : this.state.lastName,
            avatar : this.state.avatar
        }
        let list = [...this.state.userDetail]
        list.push(data)
        this.setState({
            userDetail:list,
            id : 13,
            firstName : "",
            lastName :"",
            email : "",
            job:"",
            avatar : "https://www.x-innovations.se/wp-content/uploads/dummy-prod-1.jpg",
            componentDidMountHappened:false,    //this is because when userdetail gets updated, it is not reflecting in updateUser component. so that to re-render that component we need this.
        })
        axios.post("https://reqres.in/api/users",{
            name: this.state.firstName,
            job : this.state.job,
        })
        .then((res) => {
            console.log(res)
        })
        setTimeout(() => {
            this.setState({
                componentDidMountHappened:true, //this is because when userdetail gets updated, it is not reflecting in updateUser component. so that to re-render that component we need this.
            })
        }, 100);
    }

    firstNameHandler = (event) => {
        event.preventDefault();
        this.setState({
            firstName : event.target.value,
        })
    }
    
    lastNameHandler = (event) => {
        event.preventDefault()
        this.setState({
            lastName : event.target.value
        })
    }

    emailHandler = (event) => {
        event.preventDefault()
        this.setState({
            email : event.target.value
        })
    }

    jobHandler = (event) => {
        event.preventDefault()
        this.setState({
            job : event.target.value
        })
    }

    avatarHandler = (event) =>{
        event.preventDefault()
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                this.setState(
                    {
                        avatar : reader.result,
                    }
                )
            }
        }
        reader.readAsDataURL(event.target.files[0])
    }

    logOutHandler =(event)=>{
        event.preventDefault()
        sessionStorage.removeItem("userName")
        this.props.history.push("/")
    }

    currentUserPagHandler = (id) =>{
        this.setState({
            currentUserPag :id,
            componentDidMountHappened:false,
        })
        
        setTimeout(() => {
            this.setState({
                componentDidMountHappened:true
            })
        }, 100);
    }

    updateUserHandler = (event, updatedData) => {
        event.preventDefault()
        this.setState({
            userDetail : updatedData,
        })
    }
    
    deleteUserHandler = (event,deletedData) =>{
        event.preventDefault()
        this.setState({
            userDetail : deletedData,
        })
    }

    createUserToggler = (event) => {
        event.preventDefault()
        this.setState({
            createUserToggle :true,
            updateUserToggle :false,
            deleteUserToggle :false,
        })
    }
    updateUserToggler = (event) => {
        event.preventDefault()
        this.setState({
            createUserToggle :false,
            updateUserToggle :true,
            deleteUserToggle :false,
        })
    }
    deleteUserToggler = (event) => {
        event.preventDefault()
        this.setState({
            createUserToggle :false,
            updateUserToggle :false,
            deleteUserToggle :true,
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
        // fetch("https://reqres.in/api/users?page=2")   //for second 6 users
        // .then((res) =>{ 
        //    return res.json()
        // })
        // .then((data) => {
        //     let list = [...this.state.userDetail]
        //     list.push(...data.data)
        //     this.setState({
        //         userDetail : list,
        //         componentDidMountHappened:true,
        //     })
        // })
        setTimeout(() => {
            fetch("https://reqres.in/api/users?page=2")   //for second 6 users
            .then((res) =>{ 
            return res.json()
            })
            .then((data) => {
                let list = [...this.state.userDetail]
                list.push(...data.data)
                this.setState({
                    userDetail : list,
                    componentDidMountHappened:true,
                })
            })
        }, 100);
    }
    
    render(){
        // console.log(this.state.userDetail);
        let stateData = this.state.userDetail;
        let currentUser = this.state.currentUserPag
        const userName = sessionStorage.getItem("userName");
        if(sessionStorage.getItem("userName") !==null){
            return(
                <>
                <div className="welcome">
                    <p className="">Hello {userName}!</p>
                    <p onClick = {this.logOutHandler} className="logout-btn">Log out</p>
                </div>
                <div className="left-div">
                    <h4 className={this.state.createUserToggle ? "left-div-h4-create-active" :"left-div-h4-create"} onClick={this.createUserToggler}>Create New User</h4>
                    <h4 className={this.state.updateUserToggle ? "left-div-h4-active":"left-div-h4"} onClick = {this.updateUserToggler}>Update User Detail</h4>
                    <h4 className = {this.state.deleteUserToggle ? "left-div-h4-delete-active":"left-div-h4-delete"} onClick = {this.deleteUserToggler}>Delete User</h4>
                    {this.state.createUserToggle &&
                    <>
                        <CreateUser stateData = {this.state}
                        firstNameHandler = {this.firstNameHandler}
                        lastNameHandler = {this.lastNameHandler}
                        emailHandler = {this.emailHandler}
                        jobHandler = {this.jobHandler}
                        avatarHandler = {this.avatarHandler}
                        createUserHandler={this.createUserHandler} />
                        <br/>
                    </>
                    }
                    {/* <h4 className="left-div-h4" onClick = {this.updateUserToggler}>Update User Detail</h4> */}
                    {this.state.componentDidMountHappened && this.state.updateUserToggle &&
                    <>
                        <UpdateUser 
                        stateData = {stateData}
                        currentUser = {currentUser}
                        updateUserHandler = {this.updateUserHandler} />
                        <br/>
                    </>
                    }
                    {/* <h4 className = "left-div-h4" onClick = {this.deleteUserToggler}>Delete User</h4> */}
                    {this.state.componentDidMountHappened && this.state.deleteUserToggle &&
                    <>
                        <DeleteUser
                        stateData = {stateData}
                        currentUser = {currentUser}
                        deleteUserHandler = {this.deleteUserHandler} />
                    </>
                    }

                </div>
                <div className="main-div">
                    <h4 className="main-div-h4">User Profiles</h4>
                    <Root 
                    userDetail = {this.state.userDetail} 
                    currentUserPag = {this.state.currentUserPag}
                    currentUserPagHandler = {this.currentUserPagHandler}
                    />
                </div>
                </>
            )
        }
        else{
            this.props.history.push("/login")
            return(
                <>
                </>
            )
        }
    }
}

export default Dashboard;