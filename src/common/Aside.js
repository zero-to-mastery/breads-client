import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserById } from '../features/user/selectors';
import { getSubscriptions } from '../features/subscriptions/selectors'
import UserImage from './UserImage';
import Subscribe from './Subscribe';

const Aside = (props) => {
    const { readings, user, friends, currentUser, title, match } = props;

    let u = {};
    // if (!readings) u = currentUser;
    if (user) u = user;
    else u = currentUser;

    let image = <UserImage
                    image={u.image}
                    username={u.username}
                    class='card-img-top border-bottom border-secondary'
                />;

    return (
        <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0 mb-2'>
            <div className='card border-secondary'>
                {match && image}
                <div className='card-body'>
                    <div className='row pl-3 pr-3'>
                        <h5 className='card-title mr-auto'>{title || u.username}</h5>
                        {!title && currentUser.id && currentUser.id === u.id && 
                            <NavLink exact to={`/${u.id}/edit`} className='text-warning'>
                                <FontAwesomeIcon icon={['far', 'edit']}/>
                            </NavLink>
                        }
                        <Subscribe user={u.id} />
                    </div>
                    {!title && 
                        <NavLink exact to={`/${u.id}/subscriptions`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm readings-sum'>
                            Friends: {friends ? friends.length : 0}
                        </NavLink>
                    }
                    <div>
                        {props.children}
                    </div>
                </div>
            </div>
        </aside>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        user: ownProps.match ? getUserById(state, ownProps.match.params.id) : null,
        currentUser: state.currentUser.user,
        friends: ownProps.match ? getSubscriptions(state, ownProps.match.params.id) : null,
    }
}

export default connect(mapStateToProps)(Aside);