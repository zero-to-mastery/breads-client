import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeUserReading, markFavorite, unfavorite } from '../userReadings/userReadingsActions';
import { fetchFavoriteReadings } from './favoriteReadingsActions';
import { fetchSummary, removeSummary } from '../summary/summaryAction';
import VirtualizedList from '../../common/VirtualizedList';

class FavoriteReadingsList extends Component {
    componentDidMount() {
        this.props.fetchFavoriteReadings(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchFavoriteReadings(this.props.match.params.id);
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

function mapStateToProps(state) {
    return {
        readings: state.favoriteReadings,
        summary: state.summary,
        currentUser: state.currentUser,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { 
    fetchFavoriteReadings,
    fetchSummary,
    removeUserReading,
    removeSummary,
    markFavorite,
    unfavorite
})(FavoriteReadingsList);