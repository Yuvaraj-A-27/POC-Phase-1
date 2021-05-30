import axios from 'axios';
import React from 'react';
import './Login.css'
import Close from '../media/close.png';

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
        event.preventDefault()
        this.setState({
            email : event.target.value
        })
    }
    passwordHandler = (event) =>{
        event.preventDefault()
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
            if(res.data.token === localStorage.getItem("token")){
                // alert(localStorage.getItem("userName"))
                sessionStorage.setItem("userName", localStorage.getItem("userName"))
                // alert(sessionStorage.getItem("userName"))
                this.props.history.push("/dashboard")
            }
            // console.log(res);
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
        // alert(localStorage.getItem("token"))
        this.refVariable.current.focus()
    }    

    render(){
        return (
            <div className="form-div">
                <form className="form">
                    <h3 className="form-h3">Login</h3>
                    <label className="form-label">Email</label><br/>
                    <input className="form-input" type = "email" value = {this.state.email} onChange={this.emailHandler} ref ={this.refVariable} /><br/>
                    <label className="form-label">Password</label><br/>
                    <input className="form-input" type = "password" value = {this.state.password} onChange={this.passwordHandler}/><br/>
                    <button className="form-btn" onClick={this.onSubmit}>Login</button>
                    <img src = {Close} onClick={this.closeHandler} alt = "close" className="form-img"/>                
                </form>
            </div>
        )
    }
}

export default Login;