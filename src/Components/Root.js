import React from 'react';
import Card from './Card';
import './Root.css';

class Root extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userDetail : [],
            currentUser : 7
        }
    }

    clickHandler = (id) =>{
        this.setState({
            currentUser:id
        })
    }

    componentDidMount(){
        fetch("https://reqres.in/api/users?page=2")
        .then((res) =>{ 
           return res.json()
        })
        .then((data) => {
            this.setState({
                userDetail : data.data,
            })
        })
    }

    render(){
        console.log(this.state)
        const userDetail = this.state.userDetail.map( (element) => (<>
            { (this.state.currentUser ===element.id || this.state.currentUser+1 === element.id) &&
            <Card key = {element.id} 
                img={element.avatar} alt={element.id} 
                firstName ={element.first_name} 
                lastName = {element.last_name} email ={element.email}   
            />
            }
            </>
        ))

        const pagination = this.state.userDetail.map( (element) => (<><button onClick={()=>this.clickHandler(element.id)}>{element.id}</button>
            </>
        ))
        // console.log(this.state.userDetail);
        return(
            <>
            <div className="pagination">
                {/* <button>&laquo;</button> */}
                {pagination}
            </div>
                {userDetail}
            </>
        )
    }
}

export default Root;