import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component{

    render(){
        return(
            <div>
                <Link to = '/register' className="">Register</Link><br/>
                <Link to = '/login' className="" >Login</Link>
            </div>
        )
    }
}
export default Home;