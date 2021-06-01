import React from 'react';
import styled from 'styled-components';
import Card from './Card';
// import './Root.css';

const PagDiv = styled.div `
    display:flex;
    justify-content: center;
    margin-top: 50px;
    margin-left : auto;
    margin-right: auto;
`
const Button = styled.button `
    /* color: black; */
    color: ${props => props.active==='active'? "rgb(253, 252, 252)" : "black"};
    float: left;
    padding: 8px 18px;
    text-decoration: none;
    transition: background-color .3s;
    border: 1px solid rgb(87, 87, 87);
    margin: 0 4px;
    background-color: ${props => props.active==="active" ? "chartreuse" : ""};

    &:hover{
        /* background-color: #ddd; */
        background-color: ${props => props.active==='active' ? "" : "#ddd"};
    }
`

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
        const userDetail = this.props.userDetail[this.props.currentUserPag - 1]
        const pagination = this.props.userDetail.map( (element,index) => (
            <Button active={index + 1 === this.props.currentUserPag ? "active" : ""}
            onClick={()=>this.props.currentUserPagHandler(index+1)} key = {element.id}>{index+1}</Button>
        ))

        return(
            <>
            <PagDiv>
                {pagination}
            </PagDiv>
                <Card 
                img={userDetail.avatar} alt={userDetail.id} 
                firstName ={userDetail.first_name} 
                lastName = {userDetail.last_name} email ={userDetail.email}   
                />
            </>
        )
    }
}

export default Root;