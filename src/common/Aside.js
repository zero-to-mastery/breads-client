import React from 'react';

const Aside = ({children}) => {
    return (
        <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0 mb-2'>
            {children}
        </aside>
    )
}

export default Aside;