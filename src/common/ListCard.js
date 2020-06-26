import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DefaultImage from '../images/default-profile-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListCard = props => {
    const { id, users, subscribed, removeSubscription } = props;
    return (
        <div className='card border-secondary'>
            <img
                src={users[id].image || DefaultImage}
                alt={users[id].username}
                className='card-img-top border-bottom border-secondary'
            />
            <div className='card-body'>
                <div className='row pl-3 pr-3'>
                    <Link to={`/${id}`} className='card-title mr-auto'>
                        <h5>{users[id].username}</h5>
                    </Link>
                    {subscribed && (
                        <small onClick={removeSubscription} className='text-danger unsubscribe'>
                            <FontAwesomeIcon icon='user-times'/>
                        </small>
                    )}
                </div>
                {users[id].first} {users[id].last}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        users: state.user
    }
}

export default connect(mapStateToProps)(ListCard);