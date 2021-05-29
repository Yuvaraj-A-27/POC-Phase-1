import React from 'react';

class UpdateUser extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            firstName : "",
            lastName :"",
            email : "",
            job : "",
            avatar : "",
            userDetail : [],
            currentId : 1,
        }
    }

    firstNameHandler = (e) => {
        e.preventDefault()
        this.setState({
            firstName : e.target.value
        })
    }

    lastNameHandler = (e) => {
        e.preventDefault()
        this.setState({
            lastName : e.target.value
        })
    }

    emailHandler = (e) => {
        e.preventDefault()
        this.setState({
            email : e.target.value
        })
    }

    avatarHandler = (e) => {

    }

    componentDidMount(){
        this.setState({
            userDetail : this.props.stateData,
            currentId:this.props.currentUser
        })
    }

    render(){
        // console.log(this.state.userDetail);
        let updateDetail = this.state.userDetail.map((e) => (<>
        { this.state.currentId === e.id &&
            <form>
            <label>First Name </label>
            <input 
                type = "text"
                value = {this.state.firstName}
                onChange ={this.firstNameHandler} /><br/>
            <label>Last Name </label>
            <input 
                type = "text"
                value = {e.last_name}
                onChange = {this.lastNameHandler} /><br/>
            <label>Email </label>
            <input
                type ="email"
                value = {e.email}
                onChange = {this.emailHandler} /><br/>
            {/*<label>Job </label>
             <input 
                type = "text"
                value = {this.state.job}
                onChange = "" /> */}
            <img src = {e.avatar} alt = "user" className="" /><br/>
            <input
                type ="file"
                accept="image/*"
                onChange = {this.avatarHandler} /><br/>
            <input 
                type="submit"
                onClick= ""
                value = "Update"
                />
        </form>
        }
        </>))
        return(
            <>
            {updateDetail}
            </>
        )
    }
}

export default UpdateUser;