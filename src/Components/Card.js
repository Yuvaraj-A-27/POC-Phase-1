import React from 'react';
import './Card.css'
function Card(props){

    return(
        <div className="card">
            <img src = {props.img} alt={props.alt} className="image" />
            <div className="container">
                <h4>{props.firstName} {props.lastName}</h4>
                <p className="container-p">{props.email}</p>
            </div>
        </div>
    )
}

export default Card;