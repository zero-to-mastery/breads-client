import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImage from './UserImage';
import { getReadingById } from '../features/globalReadings/reducer';

const ListItem = props => {
    const { users, reading } = props; // get actions from store, not readingList!!
    return (
        <li style={props.style} className='list-group-item border-secondary'>
            <h5 className='row'><a href={`${reading.url}`} target='_blank'  rel='noopener noreferrer' className='text-primary'><strong>{reading.title}</strong></a></h5>
            <div className='row reading-area'>
                <p className='lead'>{reading.domain}</p>
                <p className='text-muted ml-auto'>~{Number(reading.word_count).toLocaleString()} words</p>             
            </div>
            <div className='row'>
                <UserImage
                    image={users[reading.reader].image}
                    username={users[reading.reader].username}
                    class='timeline-image'
                    height='48'
                    width='48'
                />
                {!props.isCorrectUser && 
                    <Link to={`/${users[reading.reader].id}`} className='btn text-primary m-2'>
                        <small>{users[reading.reader].username}</small>
                    </Link>    
                }
                <Moment className='text-muted mt-3 ml-2' fromNow ago>
                    {reading.date}
                </Moment> 
                {props.loading.isLoading && props.loading.id.includes(props.id)
                    ? <p onClick={props.viewSummary} className='btn text-muted m-2 ml-auto'>
                        <FontAwesomeIcon icon='spinner' pulse/>
                    </p>
                    : [(props.summary === '' || props.summary.id != props.id
                        ? <p key='view' onClick={props.viewSummary} className='btn text-muted m-2 ml-auto'>
                            <FontAwesomeIcon icon='book-reader'/>
                        </p>
                        : <p key='remove' onClick={props.removeSummary} className='btn text-muted m-2 ml-auto'>
                            <FontAwesomeIcon icon='window-close'/>
                        </p>
                    )]
                }
                {props.isCorrectUser && (
                    reading.favorite
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
                {props.summary.id == reading.id &&
                    <p className='summary-data'>{props.summary.data}</p>
                }
            </div>
        </li>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.user,
        reading: getReadingById(state, ownProps.list, ownProps.id)
    }
}

export default connect(mapStateToProps)(ListItem);