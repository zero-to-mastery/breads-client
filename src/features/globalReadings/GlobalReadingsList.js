import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadingsIfNeeded } from './actions';
import { getReadings } from './reducer';
import summary from '../summary';
import VirtualizedList from '../../common/VirtualizedList';

class ReadingsList extends Component {
    componentDidMount() {
        this.props.fetchReadingsIfNeeded(this.props.list);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.path !== prevProps.match.path) {
            this.props.fetchReadingsIfNeeded(this.props.list);
        }
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

function mapStateToProps(state, ownProps) {
    return {
        readings: getReadings(state, ownProps.list),
        summary: state.summary,
        loading: state.loading,
        isAuthenticated: state.currentUser.isAuthenticated
    }
}

export default connect(mapStateToProps, { 
    fetchReadingsIfNeeded,
    ...summary.actions
})(ReadingsList);