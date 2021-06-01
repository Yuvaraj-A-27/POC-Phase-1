import React from 'react';
import styled from 'styled-components';
// import './UpdateUser.css'

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
const Img = styled.img `
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
            <Input 
                type = "text"
                value = {this.state.firstName}
                onChange ={this.firstNameHandler}
                // value = {this.props.stateData2.firstName}
                // onChange = {this.props.firstNameHandler}
                 /><br/>
            <label>Last Name&nbsp;&nbsp;</label>
            <Input 
                type = "text"
                value = {this.state.lastName}
                onChange = {this.lastNameHandler}
                /><br/>
            <label>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <Input
                type ="email"
                value = {this.state.email}
                onChange = {this.emailHandler}
                 /><br/>
            {/*<label>Job </label>
             <input 
                type = "text"
                value = {this.state.job}
                onChange = "" /> */}
            <Img src = {this.state.avatar} alt = "user" /><br/>
            <File
                type ="file"
                accept="image/*"
                onChange = {this.avatarHandler}
                 /><br/>
            {!this.state.updatedUserDetail &&    
            <Button 
                type="submit"
                onClick= {this.updateHandler}
                value = "Update"
                />
            }
            {this.state.updatedUserDetail &&
            <Button 
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