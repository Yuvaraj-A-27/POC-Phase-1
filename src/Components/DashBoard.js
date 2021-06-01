import axios from 'axios';
import React from 'react';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';
import Root from './Root'
import UpdateUser from './UpdateUser';
import styled from 'styled-components';

const TopDiv = styled.div `
    font-size: 25px;
    font-weight: 100;
    background-color: rgba(224, 219, 219, 0.842);
    margin-left: 30%;
    padding-bottom: 2px;
    padding-top: 3px;
`
const Logout = styled.p `
    float:right;
    margin-right: 30px;
    margin-top: -61px;
    font-size: 20px;
    color: rgb(251, 253, 251);
    font-weight: 400;
    background-color: rgb(64, 189, 247);
    padding: 10px;
    box-shadow: 5px 7px 8px 2px rgb(167, 165, 165);

    &:hover{
        box-shadow: 5px 7px 8px 3px rgb(167, 165, 165);
        background-color: rgba(13, 156, 223, 0.863);
    }
`
const LeftDiv = styled.div `
    background-color: rgb(58, 181, 238);
    margin-right: 70%;
    min-height: 637px;
    margin-top: -105px;
`

const CreateTag = styled.h4 `
    padding-top: 60px;
    color : ${props => props.active==='active'? "rgb(255, 141, 47)" : "white"};

    &:hover{
        color: rgb(214, 214, 214);
    }
`

const UpdateTag = styled.h4 `
    padding-top: 20px;
    color: ${props => props.active==='active'? "rgb(255, 141, 47)" : "white"};

    &:hover{
        color: rgb(214, 214, 214);
    }
`

const DeleteTag = styled.h4 `
    padding-top: 20px;
    color: ${props => props.active==='active'? "rgb(255, 141, 47)" : "white"};
    padding-bottom: 10px;
    &:hover{
        color: rgb(214, 214, 214);
    }
`
const MainDiv = styled.div `
    margin-left: 30%;
    margin-top: -550px;
    min-height: 516px;
`

const MainDivH4 = styled.h4 `
    padding-top: 20px;
    font-size: 25px;
`

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
        .then(this.setState({
            componentDidMountHappened:true
        }))
    }

    firstNameHandler = (event) => {
        this.setState({
            firstName : event.target.value,
        })
    }
    
    lastNameHandler = (event) => {
        this.setState({
            lastName : event.target.value
        })
    }

    emailHandler = (event) => {
        this.setState({
            email : event.target.value
        })
    }

    jobHandler = (event) => {
        this.setState({
            job : event.target.value
        })
    }

    avatarHandler = (event) =>{
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
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        this.props.history.push("/")
    }

    currentUserPagHandler = (index) =>{
        this.setState({
            currentUserPag :index,
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
        let stateData = this.state.userDetail;
        let currentUser = this.state.currentUserPag
        const userName = localStorage.getItem("email");
        if(localStorage.getItem("email") === null){
            this.props.history.push("/login")
        }
            return(
                <>
                <TopDiv>
                    <p>Hello {userName}!</p>
                    <Logout onClick = {this.logOutHandler}>Log out</Logout>
                </TopDiv>

                <LeftDiv>
                    {/* <CreateTag className={this.state.createUserToggle ? "left-div-h4-create-active" :"left-div-h4-create"} onClick={this.createUserToggler}>Create New User</CreateTag> */}
                    <CreateTag active={this.state.createUserToggle ? "active" : "" } onClick={this.createUserToggler} >Create New User</CreateTag>
                    <UpdateTag active={this.state.updateUserToggle ? "active" : "" } onClick = {this.updateUserToggler}>Update User Detail</UpdateTag>
                    <DeleteTag active={this.state.deleteUserToggle ? "active" : "" } onClick = {this.deleteUserToggler}>Delete User</DeleteTag>
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
                        stateData2 = {this.state}
                        firstNameHandler = {this.firstNameHandler}
                        lastNameHandler = {this.lastNameHandler}
                        emailHandler = {this.emailHandler}
                        avatarHandler = {this.avatarHandler}
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
                        deleteUserHandler = {this.deleteUserHandler}
                        currentUserPagHandler = {this.currentUserPagHandler} />
                    </>
                    }
                </LeftDiv>
                <MainDiv>
                    <MainDivH4>User Profiles</MainDivH4>
                    <Root 
                    userDetail = {this.state.userDetail} 
                    currentUserPag = {this.state.currentUserPag}
                    currentUserPagHandler = {this.currentUserPagHandler}
                    />
                </MainDiv>
                </>
            )
    }
}

export default Dashboard;