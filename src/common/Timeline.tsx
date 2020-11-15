import React from 'react';

const Timeline: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='row row--justify-center'>
            {children}
        </div>
    )
}

export default Timeline;