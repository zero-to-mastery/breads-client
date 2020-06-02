import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Aside = props => {
    return (
        <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0'>
            <div className='card border-secondary'>
                {props.image}
                <div className='card-body'>
                    <div className='row pl-3 pr-3'>
                        <h5 className='card-title mr-auto'>{props.title}</h5>
                        {props.id && props.id === props.user_id && 
                            <NavLink exact to={`/${props.user_id}/edit`} className='text-warning'>
                                <FontAwesomeIcon icon={['far', 'edit']}/>
                            </NavLink>
                        }
                    </div>
                    {props.friends && 
                        <NavLink exact to={`/${props.user_id}/subscriptions`} className='text-primary'>
                            Friends: {props.friends.length}
                        </NavLink>
                    }    
                    {props.loading.isLoading && props.loading.id === props.loading_id
                        ? <p className='m-2 m-auto'>
                            <FontAwesomeIcon icon='spinner' pulse/>
                        </p>
                        : <div>
                            {props.totalReadings}
                            {props.totalFavorites}
                            {props.totalWebsites}
                            {props.topWebsite}
                            {props.totalBooks}
                        </div>
                    }
                </div>
            </div>
        </aside>
    )
}

export default Aside;