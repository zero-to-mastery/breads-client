import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptionReadingsIfNeeded } from './actions';
import { getSubscriptionReadings } from '../globalReadings/reducer';
import summary from '../summary';
import VirtualizedList from '../../common/VirtualizedList';

class SubscriptionsList extends Component {
    componentDidMount() {
        this.props.fetchSubscriptionReadingsIfNeeded('subscriptions');
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
        readings: getSubscriptionReadings(state),
        summary: state.summary,
        loading: state.loading,
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

export default connect(mapStateToProps, {
    fetchSubscriptionReadingsIfNeeded,
    ...summary.actions
})(SubscriptionsList);