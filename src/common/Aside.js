import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Aside = (props) => {
    const { user_id, users, friends } = props;
    return (
        <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0 mb-2'>
            <div className='card border-secondary'>
                {props.image}
                <div className='card-body'>
                    <div className='row pl-3 pr-3'>
                        <h5 className='card-title mr-auto'>{props.title}</h5>
                        {props.id && props.id === user_id && 
                            <NavLink exact to={`/${props.user_id}/edit`} className='text-warning'>
                                <FontAwesomeIcon icon={['far', 'edit']}/>
                            </NavLink>
                        }
                        {props.id && props.id !== user_id && 
                            <button onClick={props.newSubscription} className='btn text-primary btn-sm'>
                                <FontAwesomeIcon icon='user-plus'/>
                            </button>
                        }
                    </div>
                    {friends && 
                        <NavLink exact to={`/${user_id}/subscriptions`} className='text-primary'>
                            Friends: {friends.length}
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

function mapStateToProps(state) {
    return {
        users: state.user
    }
}

export default connect(mapStateToProps)(Aside);