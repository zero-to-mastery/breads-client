import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptionReadingsIfNeeded } from './actions';
import { getSubscriptionReadings } from '../globalReadings/reducer';
import Aside from '../../common/Aside';
import ReadingStats from '../../common/ReadingsStats';

class SubscriptionsAside extends Component {
    componentDidMount() {
        this.props.fetchSubscriptionReadingsIfNeeded('subscriptions');
    }

    render() {
        let { readings, loading } = this.props;
        let totalReadings,
            // totalWebsites,
            // topWebsite,
            totalBooks,
            totalWords = 0;
            
        if (readings && readings.length > 0) {
            readings.forEach(r => {
                totalWords += r.word_count/100000;
            }); 
            
            totalReadings = readings.length;
            // totalWebsites = readings.websites.length;
            // topWebsite = readings.websites[0].domain;
            totalBooks = totalWords.toFixed(2);
        }

        return (
            <Aside
                readings={readings}
                title="Friend's Readings"
            >
                <ReadingStats loading={loading} loading_id='subReadings' statName='Readings' stat={totalReadings}/>
                {/* <ReadingStats loading={loading} loading_id='subReadings' statName='Websites Read From' stat={totalWebsites}/> */}
                {/* <ReadingStats loading={loading} loading_id='subReadings' statName='Most Read Website' stat={topWebsite}/> */}
                <ReadingStats loading={loading} loading_id='subReadings' statName='Loaves' stat={totalBooks}/>
            </Aside>
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: getSubscriptionReadings(state),
        // readings: state.subscriptionReadings,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { fetchSubscriptionReadingsIfNeeded })(SubscriptionsAside);