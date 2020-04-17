import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPubs } from '../store/actions/users';
import { removeSubscription } from '../store/actions/subscriptions';
import List from '../components/List';
import ListCard from '../components/ListCard';

class PubsList extends Component {
    componentDidMount() {
        this.props.fetchPubs(this.props.match.params.id);
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchPubs(this.props.match.params.id);
        }
    }
    render() {
        const { users, removeSubscription, currentUser, match } = this.props;
        let pubsList = [];
            pubsList = users.map(p => (           
            <ListCard
                key={p.id}
                id={p.id}
                first={p.first_name}
                last={p.last_name}
                username={p.username}
                image={p.image}
                removeSubscription={removeSubscription.bind(this, currentUser, p.id)}
                pubs={currentUser == match.params.id ? 'yes' : 'no'}
            />
        ));
        return (
            <List list_data={pubsList} display='card-columns' />
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        currentUser: state.currentUser.user.id
    }
}

export default connect(mapStateToProps, { fetchPubs, removeSubscription })(PubsList);