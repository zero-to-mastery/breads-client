import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../store/actions/subscriptions';
import { fetchSummary, removeSummary } from '../store/actions/summary';
import List from '../components/List';
import ListItem from '../components/ListItem';

class SubscriptionsList extends Component {
    componentDidMount() {
        this.props.fetchSubscriptions();
    }
    render() {
        const { subscriptions, summary, fetchSummary, removeSummary } = this.props;
        let subscriptionsList = subscriptions.map(s => (  
            <ListItem
                key={s.id}
                reading_id={s.id}
                title={s.title}
                domain={s.domain}
                url={s.url}
                word_count={s.word_count}
                username={s.username}
                image={s.image}
                user_id={s.user_id}
                summary={summary.summary}
                viewSummary={fetchSummary.bind(this, s.id, s.url)}
                removeSummary={removeSummary}
            />    
        ));
        return (
            <List list_data={subscriptionsList} display='list-group' />
        )
    }
}

function mapStateToProps(state) {
    return {
        subscriptions: state.subscriptions,
        summary: state.summary
    }
}

export default connect(mapStateToProps, { fetchSubscriptions, fetchSummary, removeSummary })(SubscriptionsList);