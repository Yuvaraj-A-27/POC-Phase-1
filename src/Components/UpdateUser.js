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
            updatedUserDetail:false,
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
        await this.state.userDetail.map((element) => {
            if(element.id === this.state.currentId){
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
    }

    componentDidMount(){
        this.setState({
            userDetail : this.props.stateData,
            currentId:this.props.currentUser
        })

        setTimeout(() => {
            let data = this.props.stateData.map((ele) =>{
                if(this.state.currentId === ele.id){
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
        let updateDetail = this.state.userDetail.map((e) => (<>
        { this.state.currentId === e.id &&
            <form key = {e.id}>
            <label>First Name </label>
            <input 
                type = "text"
                value = {this.state.firstName}
                onChange ={this.firstNameHandler} /><br/>
            <label>Last Name </label>
            <input 
                type = "text"
                value = {this.state.lastName}
                onChange = {this.lastNameHandler} /><br/>
            <label>Email </label>
            <input
                type ="email"
                value = {this.state.email}
                onChange = {this.emailHandler} /><br/>
            {/*<label>Job </label>
             <input 
                type = "text"
                value = {this.state.job}
                onChange = "" /> */}
            <img src = {this.state.avatar} alt = "user" className="" /><br/>
            <input
                type ="file"
                accept="image/*"
                onChange = {this.avatarHandler} /><br/>
            {!this.state.updatedUserDetail &&    
            <input 
                type="submit"
                onClick= {this.updateHandler}
                value = "Update"
                />
            }
            {this.state.updatedUserDetail &&
            <input 
                type="submit"
                onClick = {this.confirmHandler}
                value = "Confirm"
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