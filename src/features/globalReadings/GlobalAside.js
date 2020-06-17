import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadings } from './readingsActions';
import Aside from '../../common/Aside';
import ReadingStats from '../../common/ReadingsStats';

class GlobalAside extends Component {
    componentDidMount() {
        this.props.fetchReadings();
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
            
            totalReadings = readings.data.length;
            totalWebsites = readings.websites.length;
            topWebsite = readings.websites[0].domain;
            totalBooks = totalWords.toFixed(2);
        }

        return (
            <Aside
                readings={readings}
                title='Global Readings'
            >
                <ReadingStats loading={loading} loading_id='readings' statName='Readings' stat={totalReadings}/>
                <ReadingStats loading={loading} loading_id='readings' statName='Websites Read From' stat={totalWebsites}/>
                <ReadingStats loading={loading} loading_id='readings' statName='Most Read Website' stat={topWebsite}/>
                <ReadingStats loading={loading} loading_id='readings' statName='Loaves' stat={totalBooks}/>
            </Aside>
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.readings,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { fetchReadings })(GlobalAside);