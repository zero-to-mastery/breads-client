import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import subscriptions from '../features/subscriptions';

const { postNewSubscription } = subscriptions.actions;

class Subscribe extends Component {
    
    handleClick = () => {
        this.props.postNewSubscription(this.props.user);
    }

    render() {
        const { currentUser, user } = this.props;
        return (
            <>
                {currentUser && user && currentUser !== user && 
                    <p onClick={this.handleClick} className='btn text-primary m-0 p-0'>
                        <FontAwesomeIcon icon='user-plus'/>
                    </p>
                }
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user.id
    }
}

export default connect(mapStateToProps, { postNewSubscription })(Subscribe);