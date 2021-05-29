import React from 'react';

class UpdateUser extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userDetail : [],
            id : 1,
        }
    }

    idHandler = (e) =>{
        e.preventDefault()
        this.setState({
            id:e.target.value
        })
    }

    componentDidMount(){
        this.setState({
            userDetail : this.props.stateData,
            id:this.props.currentUser
        })
    }

    render(){
        // console.log(this.state.userDetail);
        let id = this.state.userDetail.map((ele) => (<>
        {this.state.id === ele.id &&
            <option key = {ele.id} value = {ele.id} selected>{ele.id}</option>
        }
        {this.state.id !== ele.id &&
            <option key = {ele.id} value={ele.id}>{ele.id}</option>
        }
        </>))
        return(
            <>
            <span>Select User by ID</span>
            <select onChange ={this.idHandler} >
                {id}
            </select>

            </>
        )
    }
}

export default UpdateUser;