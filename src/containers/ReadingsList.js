import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadings } from '../store/actions/readings';
import { fetchSummary, removeSummary } from '../store/actions/summary';
import { postNewSubscription } from '../store/actions/subscriptions';
import VirtualizedList from '../components/VirtualizedList';

class ReadingsList extends Component {
    componentDidMount() {
        this.props.fetchReadings();
    }

    render() {
        const { readings, summary, fetchSummary, removeSummary, postNewSubscription, loading, isAuthenticated } = this.props;

        return (
            <VirtualizedList 
                readings={readings}
                summary={summary}
                fetchSummary={fetchSummary}
                removeSummary={removeSummary}
                postNewSubscription={postNewSubscription}
                loading={loading}
                isAuthenticated={isAuthenticated}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.readings,
        summary: state.summary,
        loading: state.loading,
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

export default connect(mapStateToProps, { 
    fetchReadings,
    fetchSummary,
    removeSummary,
    postNewSubscription
})(ReadingsList);