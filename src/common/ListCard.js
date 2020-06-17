import React from 'react';
import { Link } from 'react-router-dom';
import DefaultImage from '../images/default-profile-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListCard = props => {
    return (
        <div className='card border-secondary'>
            <img
                src={props.image || DefaultImage}
                alt={props.username}
                className='card-img-top border-bottom border-secondary'
            />
            <div className='card-body'>
                <div className='row pl-3 pr-3'>
                    <Link to={`/${props.id}`} className='card-title mr-auto'>
                        <h5>{props.username}</h5>
                    </Link>
                    {props.subscribed === 'yes' && (
                        <small onClick={props.removeSubscription} className='text-danger unsubscribe'>
                            <FontAwesomeIcon icon='user-times'/>
                        </small>
                    )}
                </div>
                {props.first} {props.last}
            </div>
        </div>
    )
}

export default ListCard;