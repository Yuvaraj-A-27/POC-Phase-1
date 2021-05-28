import React from 'react';

class CreateUser extends React.Component{

    render(){
        return(
            <>
                <form>
                    <label>First Name :</label><br/>
                    <input 
                    type = "text"
                    value = {}
                    onChange ={} /><br/>
                    <label>Last Name :</label><br/>
                    <input 
                    type = "text"
                    value = {}
                    onChange ={} /><br/>
                    <label>Email :</label><br/>
                    <input
                    type ="email"
                    value ={}
                    onChange ={} /><br/>
                    <img src ={} alt = "user-photo" />
                    <input
                    type ="file"
                    accept="image/*" />


                </form>
            </>
        )
    }
}

export default CreateUser;