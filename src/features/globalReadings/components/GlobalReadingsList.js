import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadingsIfNeeded } from '../actions';
import { getReadings } from '../selectors';
import VirtualizedList from './VirtualizedList';

class ReadingsList extends Component {
    componentDidMount() {
        this.props.fetchReadingsIfNeeded(this.props.list, this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.url !== prevProps.match.url) {
            this.props.fetchReadingsIfNeeded(this.props.list, this.props.id);
        }
    }

    render() {
        const { readings, list } = this.props;

        return (
            <VirtualizedList 
                readings={readings}
                list={list}
            />
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        readings: getReadings(state, ownProps.list, ownProps.fav)
    }
}

export default connect(mapStateToProps, { 
    fetchReadingsIfNeeded
})(ReadingsList);