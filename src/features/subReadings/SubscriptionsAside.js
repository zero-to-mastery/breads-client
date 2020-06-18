import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptionReadings } from './actions';
import Aside from '../../common/Aside';
import ReadingStats from '../../common/ReadingsStats';

class SubscriptionsAside extends Component {
    componentDidMount() {
        this.props.fetchSubscriptionReadings();
    }

    render() {
        let { readings, loading } = this.props;
        let totalReadings,
            totalWebsites,
            topWebsite,
            totalBooks,
            totalWords = 0;
            
        if (readings && readings.data.length > 0) {
            readings.data.forEach(r => {
                totalWords += r.word_count/100000;
            }); 
            
            totalReadings = readings.data.length;
            totalWebsites = readings.websites.length;
            topWebsite = readings.websites[0].domain;
            totalBooks = totalWords.toFixed(2);
        }

        return (
            <Aside
                readings={readings}
                title="Friend's Readings"
            >
                <ReadingStats loading={loading} loading_id='subReadings' statName='Readings' stat={totalReadings}/>
                <ReadingStats loading={loading} loading_id='subReadings' statName='Websites Read From' stat={totalWebsites}/>
                <ReadingStats loading={loading} loading_id='subReadings' statName='Most Read Website' stat={topWebsite}/>
                <ReadingStats loading={loading} loading_id='subReadings' statName='Loaves' stat={totalBooks}/>
            </Aside>
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.subscriptionReadings,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { fetchSubscriptionReadings })(SubscriptionsAside);