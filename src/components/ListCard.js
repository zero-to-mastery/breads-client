import React from 'react';
import { Link } from 'react-router-dom';
import DefaultImage from '../images/default-profile-image.jpg';

const ListCard = props => {
    return (
        <div className='card'>
            <img
                src={props.image || DefaultImage}
                alt={props.username}
                className='img-thumbnail'
            />
            <div className='card-body'>
                <Link to={`/${props.id}`}>
                    <h5 className='card-title'>{props.username}</h5>
                </Link>
                {props.first} {props.last}
                <Link to={`/${props.id}/subscriptions`}>
                    <p>Subscriptions</p>
                </Link>
                {props.subscribed === 'yes' && (
                    <small onClick={props.removeSubscription} className='text-danger unsubscribe'>Unsubscribe</small>
                )}
            </div>
        </div>
    )
}

export default ListCard;