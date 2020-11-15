import React from 'react';

interface AsideProps  { 
    children: React.ReactNode
 }

const Aside: React.FunctionComponent<AsideProps> = ({ children }) => {
    return (
        <aside className='col col--3-lg col--4-md'>
            {children}
        </aside>
    )
}

export default Aside;