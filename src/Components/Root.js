import React from 'react';
import Card from './Card';
import './Root.css';

class Root extends React.Component{

    // constructor(props){
    //     super(props);

    //     this.state = {
    //         userDetail : [],
    //         currentUser : 7
    //     }
    // }

    // clickHandler = (id) =>{
    //     this.setState({
    //         currentUser:id
    //     })
    // }

    // componentDidMount(){
    //     fetch("https://reqres.in/api/users?page=2")
    //     .then((res) =>{ 
    //        return res.json()
    //     })
    //     .then((data) => {
    //         this.setState({
    //             userDetail : data.data,
    //         })
    //     })
    // }

    render(){
        // const userDetail = this.props.userDetail.map( (element) => (<>
        //     { (this.props.currentUserPag === element.id) &&
        //     <Card key = {element.id} 
        //         img={element.avatar} alt={element.id} 
        //         firstName ={element.first_name} 
        //         lastName = {element.last_name} email ={element.email}   
        //     />
        //     }
        //     </>
        // ))
        const userDetail = this.props.userDetail.map( (element,index) => (<>
            { (this.props.currentUserPag === index+1) &&
            <Card key = {element.id} 
                img={element.avatar} alt={element.id} 
                firstName ={element.first_name} 
                lastName = {element.last_name} email ={element.email}   
            />
            }
            </>
        ))

        // const pagination = this.props.userDetail.map( (element) => (<>
        //     <button className={element.id === this.props.currentUserPag ? "pagination-button-active" : "pagination-button"}
        //     onClick={()=>this.props.currentUserPagHandler(element.id)} key = {element.id}>{element.id}</button>
        //     </>
        // ))

        const pagination = this.props.userDetail.map( (element,index) => (<>
            <button className={index + 1 === this.props.currentUserPag ? "pagination-button-active" : "pagination-button"}
            onClick={()=>this.props.currentUserPagHandler(index+1)} key = {element.id}>{index+1}</button>
            </>
        ))

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