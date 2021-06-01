import React from 'react';
// import './CreateUser.css'
import styled from 'styled-components';

const Input = styled.input `
    background-color:rgb(156, 252, 252);
    padding: 3px 10px;
    box-sizing: border-box;
    border: none;
    color:rgb(58, 58, 58);
    font-size: 18px;
    font-weight: 500;
    margin-left: 1%;
    margin-top: 2%;
`
const File = styled.input `
    margin-left: 35%;
    margin-top: 2%;
    margin-bottom: 2%;
`
const Image = styled.img `
    width : 25%;
    margin-top: 2%;
    margin-left: 18%;
`
const Button = styled.input `
    border:none;
    color:rgb(58, 58, 58);
    padding:6px 15px;
    font-weight: 900;
    font-size: 16px;
    background-color: rgb(156, 252, 252);
    margin-top: 1%;
    margin-left: 18%;

    &:hover{
        background-color: rgb(118, 247, 247);
    }
`

class CreateUser extends React.Component{

    render(){
        return(
            <>
                <form>
                    <label>First Name&nbsp;</label>
                    <Input 
                    type = "text"
                    value = {this.props.stateData.firstName}
                    onChange ={this.props.firstNameHandler}
                    /><br/>
                    <label>Last Name&nbsp;</label>
                    <Input 
                    type = "text"
                    value = {this.props.stateData.lastName}
                    onChange ={this.props.lastNameHandler}
                    /><br/>
                    <label>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <Input
                    type ="email"
                    value ={this.props.stateData.email}
                    onChange ={this.props.emailHandler}
                    /><br/>
                    <label>Job&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <Input 
                    type = "text"
                    value = {this.props.stateData.job}
                    onChange = {this.props.jobHandler} 
                    /><br/>
                    <Image src ={this.props.stateData.avatar} alt = "user" className="create-user-avatar" /><br/>
                    <File
                    type ="file"
                    accept="image/*"
                    onChange ={this.props.avatarHandler}
                    /><br/>
                    <Button 
                    type="submit"
                    onClick={this.props.createUserHandler}
                    value = "Create"
                    className = "create-user-btn"
                    />
                </form>
            </>
        )
    }
}

export default CreateUser;