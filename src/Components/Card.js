import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    width : 15%;
`

function Card(props){

    return(
        <div className="">
            <div className="">
                <h4>{props.firstName} {props.lastName}</h4>
                <p className="">{props.email}</p>
            </div>
            <Image src = {props.img} alt={props.alt} className="card-img" />
            
        </div>
    )
}

export default Card;