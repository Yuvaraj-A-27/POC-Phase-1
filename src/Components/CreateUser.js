import React from 'react';
import './CreateUser.css'

class CreateUser extends React.Component{

    render(){
        return(
            <>
                <form className="form-create-user">
                    <label>First Name </label>
                    <input 
                    type = "text"
                    value = {this.props.stateData.firstName}
                    onChange ="" /><br/>
                    <label>Last Name </label>
                    <input 
                    type = "text"
                    value = {this.props.stateData.lastName}
                    onChange ="" /><br/>
                    <label>Email </label>
                    <input
                    type ="email"
                    value ={this.props.stateData.email}
                    onChange ="" /><br/>
                    <img src ={this.props.stateData.avatar} alt = "user-photo" className="avatar" /><br/>
                    <input
                    type ="file"
                    accept="image/*" /><br/>
                    <button onClick="">create</button>

                </form>
            </>
        )
    }
}

export default CreateUser;