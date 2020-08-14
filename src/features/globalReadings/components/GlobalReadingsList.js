import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadingsIfNeeded } from '../actions';
import { getReadings } from '../selectors';
import tags from '../../tags';
import VirtualizedList from './VirtualizedList';

class ReadingsList extends Component {
    componentDidMount() {
        this.props.fetchTags();
        this.props.fetchReadingsIfNeeded(this.props.list, this.props.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.url !== prevProps.match.url) {
            this.props.fetchTags();
            this.props.fetchReadingsIfNeeded(this.props.list, this.props.id);
        }
    }

    render() {
        const { readings, list, outdated } = this.props;

        return (
            <VirtualizedList 
                readings={readings}
                list={list}
                outdated={outdated}
            />
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        readings: getReadings(state, ownProps.list, ownProps.fav, ownProps.outdated)
    }
}

export default connect(mapStateToProps, { 
    fetchReadingsIfNeeded,
    ...tags.actions
})(ReadingsList);