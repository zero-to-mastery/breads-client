import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSubscriptionReadings } from '../store/actions/subscriptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SubscriptionsAside extends Component {
    componentDidMount() {
        this.props.fetchSubscriptionReadings();
    }

    render() {
        let {  readings, loading } = this.props;
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
            <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0'>
                <div className='card border-secondary'>
                    <div className='card-body'>
                        <h5 className='card-title'>Friend's Readings</h5>
                        {loading.isLoading && loading.id === 'subReadings'
                            ? <p className='m-2 m-auto'>
                                <FontAwesomeIcon icon='spinner' pulse/>
                            </p>
                            : <div>
                                {totalReadings}
                                {totalWebsites}
                                {topWebsite}
                                {totalBooks}
                            </div>
                        }
                    </div>
                </div>
            </aside>
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.subscriptions,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { fetchSubscriptionReadings })(SubscriptionsAside);