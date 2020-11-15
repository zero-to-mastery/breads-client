import React from 'react';

interface LeftAsideProps  { 
    children: React.ReactNode
 }

const LeftAside: React.FunctionComponent<LeftAsideProps> = ({ children }) => {
    return (
        <aside className='col col--3 order-lg-1'>
            {children}
        </aside>
    )
}

export default LeftAside;