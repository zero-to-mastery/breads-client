import React from 'react';

const List = (props) => {
    return (
        <div className='col-lg-6 col-sm-10 offset-sm-1 offset-lg-0'>
            {props.list_data ? (//.length
                <div className={props.display} id='list_data'>
                    {props.list_data}
                </div>
            ) : (
                <div className='d-flex justify-content-center'>
                    <div className='spinner-grow text-primary' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default List;