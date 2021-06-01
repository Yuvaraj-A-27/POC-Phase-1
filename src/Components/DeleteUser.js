import React from 'react';
import styled from 'styled-components';
// import './DeleteUser.css'

const Avatar = styled.img `
    width : 25%;
    margin-top: 2%;
    margin-left: 0%;
`
const Button = styled.button `
    border:none;
    color:rgb(58, 58, 58);
    padding:6px 15px;
    font-weight: 900;
    font-size: 16px;
    background-color: rgb(156, 252, 252);
    margin-top: 1%;
    margin-left: 0%;

    &:hover{
        background-color: rgb(118, 247, 247);
    }
`

class DeleteUser extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            userDetail : [],
            currentId :1,
            deleteIdFound : false,
            deleteButtonClicked : false
        }
    }

    deleteHandler = async (event) =>{
        event.preventDefault()
        // let deleteList = []
        // let flag =0
        
        // await this.state.userDetail.map((e)=>{
        //     if(e.id !== this.state.currentId){
        //         if(flag===1){
        //             let data = {
        //                 id : (e.id - 1),
        //                 email : e.email,
        //                 first_name : e.first_name,
        //                 last_name : e.last_name,
        //                 avatar : e.avatar,
        //             }
        //             deleteList.push(data)
        //         }
        //         else{
        //             deleteList.push(e)
        //         }
        //     }
        //     else{
        //         flag = 1
        //     }
        // })
        let deleteList = this.state.userDetail.filter((element,index) => (index+1)!==this.state.currentId) //here element is not used but without that filter wont function properly
        this.setState({
            userDetail : deleteList,
            deleteButtonClicked :true,
        })
    }

    confirmDeleteHandler = (event) =>{
        this.props.deleteUserHandler(event, this.state.userDetail)
        this.setState({
            deleteButtonClicked:false
        })
        if(this.state.currentId >= this.state.userDetail.length){
            this.props.currentUserPagHandler(this.state.userDetail.length)
        }
    }

    componentDidMount(){
        this.setState({
            userDetail : this.props.stateData,
            currentId : this.props.currentUser,
        })
    }

    render(){
        let userData = this.props.stateData.map((e,index) =>(<>
        {this.state.currentId === index+1 &&
        <div key = {e.id}>
            <p><strong>First Name : </strong>{e.first_name}</p>
            <p><strong>Last Name : &nbsp;</strong>{e.last_name}</p>
            <p><strong>Email : </strong>{e.email}</p>
            <Avatar src = {e.avatar} alt = "userAvatar" />
        </div>
        }
        </>))
        return(
            <>
            {userData}<br/>
            {!this.state.deleteButtonClicked &&
                <Button onClick = {this.deleteHandler} >Delete</Button>
            }
            {this.state.deleteButtonClicked &&
                <Button  onClick = {this.confirmDeleteHandler} >Confirm</Button>
            }
            </>
        )
    }
}

export default DeleteUser;