import { computeHeadingLevel } from '@testing-library/dom';
import React from 'react';

const HOCLogReg = (Component) => {
    class HOCLogReg extends React.Component{

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
        render(){
            return(
                <>
                    <Component emailHandler={this.emailHandler} passwordHandler={this.passwordHandler}/>
                </>
            )
        }
    }
}

export default HOCLogReg;