import axios from 'axios';
import React from 'react';
// import './Login.css'
import Close from '../media/close.png';
import styled from 'styled-components';

const FormDiv = styled.div `
    position:fixed;
    /* display:; */
    margin-top: 60px;
    margin-bottom: auto;
    margin-left: 480px;
    margin-right: auto;
    z-index: 5;
`
const Form = styled.form `
    align-items: center;
    width: 400px;
    height: 360px;
    border-radius: 2%;
    text-align: center;
    line-height: 30px;
    box-shadow: 0 4px 10px 4px black;
`
const Label = styled.label `
    align-items: center;
    color: black;
    font-weight: 700;
    font-style: italic;
    font-family: Georgia, 'Times New Roman', Times, serif;
`
const Title = styled.h3 `
    padding-top: 30px;
`
const Button = styled.button `
    padding: 5px 15px;
    border: 10px;
    color: white;
    background-color: springgreen;
    font-size: 15px;
    font-weight: bold;
    margin-top: 25px;

    &:hover{
        background-color: rgb(12, 211, 112);
    }
`
const Input = styled.input `
    vertical-align: middle;
    padding: 7px;
    width: 70%;
    margin-top: 10px;

    &:hover{
        box-shadow: 1px 2px 10px 1px rgb(134, 133, 133);
    }
`
const CloseImg = styled.img `
    width: 30px;
    margin-top : -210px;
    padding-right: 20px;
    float : right;

    &:hover{
        width: 32px;
    }
`

class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password : "",
        }

        this.refVariable = React.createRef()
    }
    emailHandler = (event) =>{
        this.setState({
            email : event.target.value
        })
    }
    passwordHandler = (event) =>{
        this.setState({
            password : event.target.value
        })
    }
    onSubmit = (event) =>{
        event.preventDefault()
        axios.post("https://reqres.in/api/login",{
            email : this.state.email,
            password : this.state.password,
        })
        .then((res)=>{
            if(res.data.token){
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("email",(this.state.email))
                this.props.history.push("/dashboard")
            }
        })
        .catch((err) =>{
            console.log(err);
        })
    }

    closeHandler = (event) =>{
        event.preventDefault()
        this.props.history.push('/')
    }

    componentDidMount(){
        this.refVariable.current.focus()
    }    

    render(){
        return (
            <FormDiv>
                <Form>
                    <Title>Login</Title>
                    <Label >Email</Label><br/>
                    <Input type = "email" value = {this.state.email} onChange={this.emailHandler} ref ={this.refVariable} /><br/>
                    <Label>Password</Label><br/>
                    <Input  type = "password" value = {this.state.password} onChange={this.passwordHandler}/><br/>
                    <Button onClick={this.onSubmit}>Login</Button>
                    <CloseImg src = {Close} onClick={this.closeHandler} alt = "close"/>                
                </Form>
            </FormDiv>
        )
    }
}

export default Login;