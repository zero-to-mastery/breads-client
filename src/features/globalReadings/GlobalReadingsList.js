import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadingsIfNeeded } from './actions';
import { getReadings } from './reducer';
import VirtualizedList from '../../common/VirtualizedList';

class ReadingsList extends Component {
    componentDidMount() {
        console.log(this.props.match.url);
        this.props.fetchReadingsIfNeeded(this.props.list);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.url !== prevProps.match.url) {
            this.props.fetchReadingsIfNeeded(this.props.list);
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
        readings: getReadings(state, ownProps.list), // different action
    }
}

export default connect(mapStateToProps, { 
    fetchReadingsIfNeeded
})(ReadingsList);