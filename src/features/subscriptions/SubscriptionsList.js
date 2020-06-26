import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptions, removeSubscription } from './actions';
import List from '../../common/List';
import ListCard from '../../common/ListCard';
import { getSubscriptions } from './selectors';
// REFACTOR - DOES THIS NEED TO FETCHSUBSCRIPTIONS?
class SubscriptionsList extends Component {
    componentDidMount() {
        this.props.fetchSubscriptions(this.props.match.params.id);
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchSubscriptions(this.props.match.params.id);
        }
    }
    render() {
        const { friends, removeSubscription, currentUser, match } = this.props;
        let subscriptionsList = [];
            subscriptionsList = friends.map(id => (  
            <ListCard
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