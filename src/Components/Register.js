import axios from 'axios';
import React from 'react';
import './Register.css'
import Close from '../media/close.png';

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
            <div className="form-div-dev">
                <form className="form-dev">
                    <h3 className="form-h3-dev">Register</h3>
                    <img src = {Close} onClick={this.closeHandler} alt = "close" className="form-img-dev"/>                
                    <label className="form-label-dev">First Name</label><br/>
                    <input type = "text" value={this.state.firstName} onChange = {this.firstNameHandler} ref={this.refVariable} className="form-input-dev"/><br/>
                    <label className="form-label-dev">Last Name</label><br/>
                    <input type = "text" value={this.state.lastName} onChange = {this.lastNameHandler} className="form-input-dev"/><br/>
                    <label className="form-label-dev">Email</label><br/>
                    <input type = "email" value={this.state.email} onChange = {this.emailHandler} className="form-input-dev"/><br/>
                    <label className="form-label-dev">Password</label><br/>
                    <input type = "password" value={this.state.password} onChange = {this.passwordHandler} className="form-input-dev"/><br/>
                    <button className="form-btn-dev" onClick={this.onSubmit}>Register</button><br/>
                    {this.state.dataNotEntered &&
                        <p className="error">Please enter all the fields</p> 
                    }
                    {this.state.notAnAdmin && 
                        <p className="error">Only Admin can register. Admin : "eve.holt@reqres.in"</p>
                    }
                </form>
            </div>
        )
    }
}

export default Register;