import React from 'react';

interface LeftAsideProps  { 
    children: React.ReactNode
 }

const LeftAside: React.FunctionComponent<LeftAsideProps> = ({ children }) => {
    return (
        <aside className='col col--3-lg col--4-md order order--1-md'>
            {children}
        </aside>
    )
}

export default LeftAside;