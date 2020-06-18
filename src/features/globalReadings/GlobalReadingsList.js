import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadings } from './actions';
import summmary from '../summary';
import VirtualizedList from '../../common/VirtualizedList';
import summary from '../summary';

class ReadingsList extends Component {
    componentDidMount() {
        this.props.fetchReadings();
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
        readings: state.globalReadings,
        summary: state.summary,
        loading: state.loading,
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

export default connect(mapStateToProps, { 
    fetchReadings,
    ...summary.actions
})(ReadingsList);