import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReadingStats = ({ statName, stat, loading, loading_id }) => {
    return (
        <p className='card-text'>
            {statName}:
            {loading.isLoading && loading.id.includes(loading_id)
                ? <FontAwesomeIcon icon='spinner' pulse/>
                : <strong> {stat}</strong>
            }
        </p>
    )
}

export default ReadingStats;