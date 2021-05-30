import React from 'react';

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
        let deleteList = []
        let flag =0
        
        await this.state.userDetail.map((e)=>{
            if(e.id !== this.state.currentId){
                if(flag===1){
                    let data = {
                        id : (e.id - 1),
                        email : e.email,
                        first_name : e.first_name,
                        last_name : e.last_name,
                        avatar : e.avatar,
                    }
                    deleteList.push(data)
                }
                else{
                    deleteList.push(e)
                }
            }
            else{
                flag = 1
            }
        })
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
    }

    componentDidMount(){
        this.setState({
            userDetail : this.props.stateData,
            currentId : this.props.currentUser,
        })
    }

    render(){
        let userData = this.props.stateData.map((e) =>(<>
        {this.state.currentId === e.id &&
        <div key = {e.id}>
            <p><strong>First Name : </strong>{e.first_name}</p>
            <p><strong>Last Name : </strong>{e.last_name}</p>
            <p><strong>Email : </strong>{e.email}</p>
            <img src = {e.avatar} alt = "userAvatar" />
        </div>
        }
        </>))
        return(
            <>
            {userData}<br/>
            {!this.state.deleteButtonClicked &&
                <button onClick = {this.deleteHandler} >Delete</button>
            }
            {this.state.deleteButtonClicked &&
                <button onClick = {this.confirmDeleteHandler} >Confirm</button>
            }
            </>
        )
    }
}

export default DeleteUser;