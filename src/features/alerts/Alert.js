import React from 'react';

const Alert = props => {
    return (
        <div className={`alert alert-${props.alerts.type}`}>
            {props.alerts.message}
            <button onClick={props.removeAlert} className='close'>
                <span >&times;</span>
            </button>
        </div>  
    )
}

export default Alert;