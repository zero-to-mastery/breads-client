import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReadingStats = props => {
    return (
        <p className='card-text'>
            {props.statName}:
            {props.loading.isLoading && props.loading.id.includes(props.loading_id)
                ? <FontAwesomeIcon icon='spinner' pulse/>
                : <strong> {props.stat}</strong>
            }
        </p>
    )
}

export default ReadingStats;