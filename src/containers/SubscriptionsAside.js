import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptionReadings } from '../store/actions/subscriptionReadings';
import Aside from '../components/Aside';

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
            
            totalReadings = <p className='card-text reading-sum'>Readings: <strong>{readings.data.length}</strong></p>;
            totalWebsites = <p className='card-text website-sum'>Websites Read From: <strong>{readings.websites.length}</strong></p>;
            topWebsite = <p className='card-text website-sum'>Most Read Website: <strong>{readings.websites[0].domain}</strong></p>;
            totalBooks = <p className='card-text book-sum'>Loaves: <strong>{totalWords.toFixed(2)}</strong></p>;
        }

        return (
            <Aside
                readings={readings}
                loading={loading}
                loading_id='subReadings'
                title="Friend's Readings"
                totalReadings={totalReadings}
                totalWebsites={totalWebsites}
                topWebsite={topWebsite}
                totalBooks={totalBooks}
            />
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