import React from 'react';
import './CreateUser.css'

class CreateUser extends React.Component{

    render(){
        return(
            <>
                <form className="form-create-user">
                    <label>First Name&nbsp;</label>
                    <input 
                    type = "text"
                    value = {this.props.stateData.firstName}
                    onChange ={this.props.firstNameHandler}
                    className="create-user-input" /><br/>
                    <label>Last Name&nbsp;</label>
                    <input 
                    type = "text"
                    value = {this.props.stateData.lastName}
                    onChange ={this.props.lastNameHandler}
                    className="create-user-input" /><br/>
                    <label>Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input
                    type ="email"
                    value ={this.props.stateData.email}
                    onChange ={this.props.emailHandler}
                    className="create-user-input" /><br/>
                    <label>Job&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input 
                    type = "text"
                    value = {this.props.stateData.job}
                    onChange = {this.props.jobHandler} 
                    className="create-user-input" /><br/>
                    <img src ={this.props.stateData.avatar} alt = "user" className="create-user-avatar" /><br/>
                    <input
                    type ="file"
                    accept="image/*"
                    onChange ={this.props.avatarHandler}
                    className = "create-user-file" /><br/>
                    <input 
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