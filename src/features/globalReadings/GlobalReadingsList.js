import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadingsIfNeeded } from './actions';
import { getReadings } from './reducer';
import summary from '../summary';
import VirtualizedList from '../../common/VirtualizedList';

class ReadingsList extends Component {
    componentDidMount() {
        this.props.fetchReadingsIfNeeded('global');
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
        readings: getReadings(state),
        summary: state.summary,
        loading: state.loading,
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

export default connect(mapStateToProps, { 
    fetchReadingsIfNeeded,
    ...summary.actions
})(ReadingsList);