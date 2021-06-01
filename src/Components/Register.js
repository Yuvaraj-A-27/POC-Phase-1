import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
// import './Register.css'
import Close from '../media/close.png';

const FormDiv = styled.div `
    position:fixed;
    /* display:; */
    margin-top: 45px;
    margin-bottom: auto;
    margin-left: 480px;
    margin-right: auto;
    z-index: 5;
`
const Form = styled.form `
    align-items: center;
    width: 400px;
    height: 460px;
    border-radius: 2%;
    text-align: center;
    line-height: 30px;
    box-shadow: 0 4px 10px 4px black;
`
const Label = styled.label `
    align-items: center;
    color: black;
    /* padding-top: 100px; */
    /* margin-top: 10px; */
    font-weight: 700;
    font-style: italic;
    font-family: Georgia, 'Times New Roman', Times, serif;
`
const H3 = styled.h3 `
    padding-top: 30px;
`
const Img = styled.img `
    width: 30px;
    margin-top : -60px;
    padding-right: 20px;
    float : right;

    &:hover{
        width: 32px;
    }
`
const Input = styled.input `
    vertical-align: middle;
    padding: 5px;
    width: 70%;
    margin-top: 5px;
    &:hover{
        box-shadow: 1px 2px 10px 1px rgb(134, 133, 133);
    }
`
const Button = styled.button `
    padding: 5px 15px;
    border: 10px;
    color: white;
    background-color: springgreen;
    font-size: 15px;
    font-weight: bold;
    margin-top: 20px;
    &:hover{
        background-color: rgb(12, 211, 112);
    }
`
const P = styled.p `
    color: red;
    font-weight: bold;
    margin-top: 10px;
`


class Register extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            firstName : "",
            lastName:"",
            email : "",
            password : "",
            dataNotEntered : false,
            notAnAdmin: false
        }
        this.refVariable = React.createRef()
    }
    componentDidMount(){
        this.refVariable.current.focus()       //ref
    }

    onSubmit = (event)=>{
        event.preventDefault()
        if(this.state.firstName && this.state.lastName && this.state.email && this.state.password){
            // fetch("https://reqres.in/api/register",{
            //     method : 'POST',
            //     headers: {'Content-Type':'application/json'},
            //     body : {
            //         "email" : this.state.email,
            //         "password" : this.state.password
            //     }
            // })
            // fetch("https://reqres.in/api/register", this.state)
            axios.post("https://reqres.in/api/register", {
                        email : this.state.email,
                        password : this.state.password
            })
            .then((res) => {
                // localStorage.setItem("token",res.data.token)
                // localStorage.setItem("userName",(this.state.firstName +" "+this.state.lastName))
                // alert(localStorage.getItem("userName") +" is successfully registered")
                // alert(localStorage.getItem("userName"))
                if(res.data.token){
                    this.props.history.push("/login")
                }
            })
            .catch(err => {
                this.setState({
                    notAnAdmin:true
                })
            })
        }
        else{
            this.setState({
                dataNotEntered : true
            })
        }
    }

    dataNotEnteredHandler = () =>{
        if(this.state.firstName && this.state.lastName && this.state.email && this.state.password){
            this.setState({
                dataNotEntered : false
            })
        }
    }

    emailHandler = (event) =>{
        // event.preventDefault()
        this.setState({
            email : event.target.value,
            // dataNotEntered : false
        })
        this.dataNotEnteredHandler()
    }
    passwordHandler = (event) =>{
        // event.preventDefault()
        this.setState({
            password : event.target.value,
            // dataNotEntered : false
        })
        this.dataNotEnteredHandler()
    }
    firstNameHandler = (event) =>{
        // event.preventDefault()
        this.setState({
            firstName : event.target.value,
            // dataNotEntered : false
        })
        this.dataNotEnteredHandler()
    }
    lastNameHandler = (event) =>{
        // event.preventDefault()
        this.setState({
            lastName : event.target.value,
            // dataNotEntered : false
        })
        this.dataNotEnteredHandler()
    }

    closeHandler = (event) =>{
        event.preventDefault()
        this.props.history.push('/')
    }


    render(){
        // const message = ""
        // if(this.state.dataNotEntered){
        //     var message = <p className="error">Please enter all the fields</p>
        // }
        // else if(this.state.notAnAdmin){
        //     var message = <p className="error">Only Admin can register. Admin : "eve.holt@reqres.in"</p>
        // }
        return(
            <FormDiv>
                <Form>
                    <H3>Register</H3>
                    <Img src = {Close} onClick={this.closeHandler} alt = "close"/>                
                    <Label>First Name</Label><br/>
                    <Input type = "text" value={this.state.firstName} onChange = {this.firstNameHandler} ref={this.refVariable}/><br/>
                    <Label>Last Name</Label><br/>
                    <Input type = "text" value={this.state.lastName} onChange = {this.lastNameHandler} /><br/>
                    <Label>Email</Label><br/>
                    <Input type = "email" value={this.state.email} onChange = {this.emailHandler} /><br/>
                    <Label>Password</Label><br/>
                    <Input type = "password" value={this.state.password} onChange = {this.passwordHandler}/><br/>
                    <Button onClick={this.onSubmit}>Register</Button><br/>
                    {this.state.dataNotEntered &&
                        <P>Please enter all the fields</P> 
                    }
                    {this.state.notAnAdmin && 
                        <P>Only Admin can register. Admin : "eve.holt@reqres.in"</P>
                    }
                </Form>
            </FormDiv>
        )
    }
}

export default Register;