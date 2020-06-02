import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptionReadings } from '../store/actions/subscriptionReadings';
import { fetchSummary, removeSummary } from '../store/actions/summary';
import VirtualizedList from '../components/VirtualizedList';

class SubscriptionsList extends Component {
    componentDidMount() {
        this.props.fetchSubscriptionReadings();
    }

    render() {
        const { readings, summary, fetchSummary, removeSummary, loading } = this.props;
        
        return (
            <VirtualizedList 
                readings={readings}
                summary={summary}
                fetchSummary={fetchSummary}
                removeSummary={removeSummary}
                loading={loading}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.subscriptionReadings,
        summary: state.summary,
        loading: state.loading
    }
}

export default connect(mapStateToProps, {
    fetchSubscriptionReadings,
    fetchSummary,
    removeSummary
})(SubscriptionsList);