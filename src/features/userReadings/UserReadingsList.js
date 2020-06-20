import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserReadingsIfNeeded, fetchUserReadings, removeUserReading, markFavorite, unfavorite } from './actions';
import { getUserReadings } from '../globalReadings/reducer'
import summary from '../summary';
import VirtualizedList from '../../common/VirtualizedList';

class UserReadingsList extends Component {
    componentDidMount() {
        this.props.fetchUserReadingsIfNeeded(`${this.props.match.params.id}`, this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            // this.props.fetchUserReadings(this.props.match.params.id);
            this.props.fetchUserReadingsIfNeeded(`${this.props.match.params.id}`, this.props.match.params.id);
        }
    }

    render() {
        const { readings, removeUserReading, summary, fetchSummary, removeSummary, currentUser, markFavorite, unfavorite, loading } = this.props;
        
        return (
            <VirtualizedList 
                readings={readings}
                summary={summary}
                fetchSummary={fetchSummary}
                removeSummary={removeSummary}
                removeUserReading={removeUserReading}
                currentUser={currentUser}
                markFavorite={markFavorite}
                unfavorite={unfavorite}
                loading={loading}
            />
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        readings: getUserReadings(state, ownProps.match.params.id),
        summary: state.summary,
        currentUser: state.currentUser,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { 
    ...summary.actions,
    fetchUserReadingsIfNeeded,
    fetchUserReadings,
    removeUserReading,
    markFavorite,
    unfavorite
})(UserReadingsList);