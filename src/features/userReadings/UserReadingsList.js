import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserReadingsIfNeeded } from './actions';
import { getUserReadings } from '../globalReadings/reducer'
import VirtualizedList from '../../common/VirtualizedList';

class UserReadingsList extends Component {
    componentDidMount() {
        this.props.fetchUserReadingsIfNeeded(`${this.props.match.params.id}`, this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchUserReadingsIfNeeded(`${this.props.match.params.id}`, this.props.match.params.id);
        }
    }

    render() {
        const { readings, match } = this.props;
        
        return (
            <VirtualizedList 
                readings={readings}
                list={match.params.id}
            />
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        readings: getUserReadings(state, ownProps.match.params.id)
    }
}

export default connect(mapStateToProps, { 
    fetchUserReadingsIfNeeded
})(UserReadingsList);