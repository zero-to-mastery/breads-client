import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ReadingStatsProps {
    statName: any,
    stat: any,
    loading: any,
    loading_id: any
}

const ReadingStats: React.FunctionComponent<ReadingStatsProps> = ({ statName, stat, loading, loading_id }) => {
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