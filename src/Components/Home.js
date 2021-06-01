import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'


//**********styled components*********
const HomeDiv = styled.div`
    margin-top: 200px;
`
const LinkButton = styled(Link)`    //Link is a react-router element. Integrating Link(router element) with styled-component
    background-color: rgb(124, 226, 93);
    text-decoration: none;
    padding : 10px;
    margin-right: 1%;
    font-size: 25px;
    border-radius: 10px;
    box-shadow: 10px 10px 10px 1px rgb(139, 138, 138);
    color: white;

    &:hover{
        background-color: rgb(109, 223, 74);
        box-shadow: 10px 10px 10px 3px rgb(139, 138, 138);
    }
`
//**********styled components*********


class Home extends React.Component{

    render(){
        return(
            <HomeDiv>
                <LinkButton to = '/register'>Register</LinkButton>
                <LinkButton to = '/login'>Login</LinkButton>
            </HomeDiv>
        )
    }
}

export default Home;