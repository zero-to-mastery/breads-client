import React from 'react';
import { connect } from 'react-redux';
import { getReadings, getWebsites } from '../selectors';
import Aside from '../../../common/Aside';
import ReadingStats from '../../../common/ReadingsStats';

const GlobalAside = props => {
    let { readings, websites, loading, list, title } = props;
    let totalReadings,
        totalWebsites,
        topWebsite,
        totalBooks,
        totalWords = 0,
        maxReads = 0;
        
    if (readings && readings.length > 0) {
        readings.forEach(r => {
            totalWords += r.word_count/100000;
        }); 
        
        totalReadings = readings.length;
        totalWebsites = Object.keys(websites).length;
        totalBooks = totalWords.toFixed(2);

        for (const prop in websites) {
            if (websites[prop] > maxReads) {
                maxReads = websites[prop];
                topWebsite = prop;
            }
        }
    }

    return (
        <Aside
            readings={readings}
            title={title + ' Readings'}
        >
            <ReadingStats loading={loading} loading_id={list} statName='Readings' stat={totalReadings}/>
            <ReadingStats loading={loading} loading_id={list} statName='Websites Read From' stat={totalWebsites}/>
            <ReadingStats loading={loading} loading_id={list} statName='Most Read Website' stat={topWebsite}/>
            <ReadingStats loading={loading} loading_id={list} statName='Loaves' stat={totalBooks}/>
        </Aside>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        readings: getReadings(state, ownProps.list),
        websites: getWebsites(state, ownProps.list),
        loading: state.loading
    }
}

export default connect(mapStateToProps)(GlobalAside);