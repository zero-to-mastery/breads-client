import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserReadingsIfNeeded, removeUserReading, markFavorite, unfavorite } from '../userReadings/actions';
import { getFavoriteReadings } from '../globalReadings/reducer';
import summary from '../summary';
import VirtualizedList from '../../common/VirtualizedList';

class FavoriteReadingsList extends Component {
    componentDidMount() {
        this.props.fetchUserReadingsIfNeeded(`${this.props.match.params.id}`, this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchUserReadingsIfNeeded(`${this.props.match.params.id}`, this.props.match.params.id);
        }
    }

    render() {
        const { readings, removeUserReading, summary, fetchSummary, removeSummary, currentUser, markFavorite, unfavorite, loading, match } = this.props;
        
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
                list={match.params.id}
            />
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        readings: getFavoriteReadings(state, ownProps.match.params.id),
        summary: state.summary,
        currentUser: state.currentUser,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { 
    ...summary.actions,
    fetchUserReadingsIfNeeded,
    removeUserReading,
    markFavorite,
    unfavorite
})(FavoriteReadingsList);