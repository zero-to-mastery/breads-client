import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptionReadings } from './subscriptionReadingsActions';
import { fetchSummary, removeSummary } from '../summary/summaryAction';
import VirtualizedList from '../../common/VirtualizedList';

class SubscriptionsList extends Component {
    componentDidMount() {
        this.props.fetchSubscriptionReadings();
    }

    render() {
        const { readings, summary, fetchSummary, removeSummary, loading, isAuthenticated } = this.props;
        
        return (
            <VirtualizedList 
                readings={readings}
                summary={summary}
                fetchSummary={fetchSummary}
                removeSummary={removeSummary}
                loading={loading}
                isAuthenticated={isAuthenticated}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.subscriptionReadings,
        summary: state.summary,
        loading: state.loading,
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

export default connect(mapStateToProps, {
    fetchSubscriptionReadings,
    fetchSummary,
    removeSummary
})(SubscriptionsList);