import React from 'react';
import './UpdateUser.css'

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
            updatedUserDetail:false,
        }
    }

    firstNameHandler = (e) => {
        // e.preventDefault()
        this.setState({
            firstName : e.target.value
        })
    }

    lastNameHandler = (e) => {
        // e.preventDefault()
        this.setState({
            lastName : e.target.value
        })
    }

    emailHandler = (e) => {
        // e.preventDefault()
        this.setState({
            email : e.target.value
        })
    }

    avatarHandler = (event) =>{
        // event.preventDefault()
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

    updateHandler = async(event) =>{
        event.preventDefault()
        let updatedData = {
            id : this.state.currentId,
            email : this.state.email,
            first_name : this.state.firstName,
            last_name : this.state.lastName,
            avatar : this.state.avatar,
        }
        let updateList = []
        await this.state.userDetail.map((element,index) => {
            if(index+1 === this.state.currentId){
                updateList.push(updatedData)
            }
            else{
                updateList.push(element)
            }
        })
        this.setState({
            userDetail : updateList,
            updatedUserDetail : true,
        })
    }
    
    confirmHandler = (event) => {
        this.props.updateUserHandler(event,this.state.userDetail)
        this.setState({
            updatedUserDetail:false
        })
    }

    componentDidMount(){
        this.setState({
            userDetail : this.props.stateData,
            currentId:this.props.currentUser
        })

        setTimeout(() => {
            let data = this.props.stateData.map((ele,index) =>{
                if(this.state.currentId === index+1){
                    this.setState({
                        firstName : ele.first_name,
                        lastName : ele.last_name,
                        email : ele.email,
                        avatar : ele.avatar,
                    })
                }
            })
        }, 10);
    }

    render(){
        // console.log(this.state.userDetail);
        let updateDetail = this.state.userDetail.map((e,index) => (<>
        { this.state.currentId === index+1 &&
            <form key = {e.id}>
            <label>First Name </label>
            <input 
                type = "text"
                value = {this.state.firstName}
                onChange ={this.firstNameHandler}
                // value = {this.props.stateData2.firstName}
                // onChange = {this.props.firstNameHandler}
                className="update-user-input" /><br/>
            <label>Last Name&nbsp;&nbsp;</label>
            <input 
                type = "text"
                value = {this.state.lastName}
                onChange = {this.lastNameHandler}
                className="update-user-input" /><br/>
            <label>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input
                type ="email"
                value = {this.state.email}
                onChange = {this.emailHandler}
                className="update-user-input" /><br/>
            {/*<label>Job </label>
             <input 
                type = "text"
                value = {this.state.job}
                onChange = "" /> */}
            <img src = {this.state.avatar} alt = "user" className="update-user-avatar" /><br/>
            <input
                type ="file"
                accept="image/*"
                onChange = {this.avatarHandler}
                className="update-user-file" /><br/>
            {!this.state.updatedUserDetail &&    
            <input 
                type="submit"
                onClick= {this.updateHandler}
                value = "Update"
                className ="update-user-btn"
                />
            }
            {this.state.updatedUserDetail &&
            <input 
                type="submit"
                onClick = {this.confirmHandler}
                value = "Confirm"
                className ="update-user-btn"
                />
            }

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