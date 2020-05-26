import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultImage from '../images/default-profile-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ListItem = props => {
    return (
        <li style={props.style} className='list-group-item border-secondary'>
            <h5 className='row'><a href={`${props.url}`} target='_blank'  rel='noopener noreferrer' className='text-primary'><strong>{props.title}</strong></a></h5>
            <div className='row reading-area'>
                <p className='lead'>{props.domain}</p>
                <p className='text-muted ml-auto'>~{Number(props.word_count).toLocaleString()} words</p>             
            </div>
            <div className='row'>
                <img
                    src={props.image || DefaultImage}
                    alt={props.username}
                    height='48'
                    width='48'
                    className='timeline-image'
                />
                <div className='dropdown'>
                    <p className='btn text-primary m-2' id='dropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                        <small>{props.username}</small>
                    </p>
                    <div className='dropdown-menu border-secondary' aria-labelledby='dropdownMenuLink'>
                        <Link to={`/${props.user_id}`}>
                            <button className='dropdown-item'>{props.username}'s Profile</button>
                        </Link>
                        <button onClick={props.newSubscription} className='dropdown-item'>
                            <small>Subscribe</small>
                        </button>
                    </div>
                </div>
                <Moment className='text-muted mt-3' fromNow ago>
                    {props.date}
                </Moment> 
                {props.loading.isLoading && props.loading.id === props.id
                    ? <p onClick={props.viewSummary} className='btn text-muted m-2 ml-auto'>
                        <FontAwesomeIcon icon='spinner' pulse/>
                    </p>
                    : [(props.summary === '' || props.summary.id != props.id
                        ? <p onClick={props.viewSummary} className='btn text-muted m-2 ml-auto'>
                            <FontAwesomeIcon icon='book-reader'/>
                        </p>
                        : <p onClick={props.removeSummary} className='btn text-muted m-2 ml-auto'>
                            <FontAwesomeIcon icon='window-close'/>
                        </p>
                    )]
                }
                {props.isCorrectUser && (
                    props.favorite
                        ? <p onClick={props.unfavorite} className='btn text-muted m-2'>
                            <FontAwesomeIcon icon='bookmark'/>
                        </p>
                        : <p onClick={props.markFavorite} className='btn text-muted m-2'>
                            <FontAwesomeIcon icon={['far', 'bookmark']}/>
                        </p>
                )}
                {props.isCorrectUser && 
                    <p onClick={props.removeReading} className='btn text-danger m-2 delete'>
                        <FontAwesomeIcon icon={['far', 'trash-alt']}/>
                    </p>
                }
                {props.summary.id == props.id &&
                    <p className='summary-data'>{props.summary.data}</p>
                }
            </div>
        </li>
    )
}

export default ListItem;