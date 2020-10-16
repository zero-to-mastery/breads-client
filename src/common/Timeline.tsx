import React from 'react';

const Timeline: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='row'>
            {children}
        </div>
    )
}

export default Timeline;