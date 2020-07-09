import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptions, removeSubscription } from './actions';
import List from '../../common/List';
import ListCard from '../../common/ListCard';
import { getSubscriptions } from './selectors';

class SubscriptionsList extends Component {
    render() {
        const { friends, removeSubscription, currentUser, match } = this.props;
        let subscriptionsList = [];
            subscriptionsList = friends.map(id => (  
            <ListCard
            // refactor like listitem
                key={id}
                id={id}
                removeSubscription={removeSubscription.bind(this, currentUser, id)}
                subscribed={`${currentUser}` === match.params.id}
            />
        ));
        return (
            <List list_data={subscriptionsList} display='card-columns' />
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        friends: getSubscriptions(state, ownProps.match.params.id),
        currentUser: state.currentUser.user.id
    }
}

export default connect(mapStateToProps, { fetchSubscriptions, removeSubscription })(SubscriptionsList);