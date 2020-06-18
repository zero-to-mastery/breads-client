import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptions, removeSubscription } from './actions';
import List from '../../common/List';
import ListCard from '../../common/ListCard';
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
            subscriptionsList = friends.map(p => (           
            <ListCard
                key={p.id}
                id={p.id}
                first={p.first_name}
                last={p.last_name}
                username={p.username}
                image={p.image}
                removeSubscription={removeSubscription.bind(this, currentUser, p.id)}
                subscribed={currentUser == match.params.id ? 'yes' : 'no'}
            />
        ));
        return (
            <List list_data={subscriptionsList} display='card-columns' />
        )
    }
}

function mapStateToProps(state) {
    return {
        friends: state.subscriptions,
        currentUser: state.currentUser.user.id
    }
}

export default connect(mapStateToProps, { fetchSubscriptions, removeSubscription })(SubscriptionsList);