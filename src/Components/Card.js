import React from 'react';
import './Card.css'
function Card(props){

    return(
        <div className="">
            <div className="">
                <h4>{props.firstName} {props.lastName}</h4>
                <p className="">{props.email}</p>
            </div>
            <img src = {props.img} alt={props.alt} className="card-img" />
        </div>
    )
}

export default Card;