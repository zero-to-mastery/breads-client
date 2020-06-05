import React from 'react';

const ErrorAlert = props => {
    return (
        <div className='alert alert-danger'>
            {props.errors.message}
            <button onClick={props.removeError} className='close'>
                <span >&times;</span>
            </button>
        </div>
    )
}

export default ErrorAlert;