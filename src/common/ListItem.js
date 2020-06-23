import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImage from './UserImage';
import { getReadingById } from '../features/globalReadings/reducer';
import { markFavorite, unfavorite } from '../features/globalReadings/actions';
import summary from '../features/summary';
import { removeUserReading } from '../features/userReadings/actions';

class ListItem extends Component {
    // decouple/consolidate reading lists
        // global and subscription - check
        // fav and user
        // user and global
    // new reading adds to db, but not to state
    // if subsReads are empty, it emptys readings state -- this affects logging out too
        // because entities.readings is empty
    // if I unfollow someone, their readings still show up in my subscription feed
    // if user has no readings, profile doesn't display 'cannot read 'filter' of undefined

    handleClick = () => {
        // markFav and unFav don't work because there's no favorite reducer now
        this.props.reading.favorite === null ? this.props.markFavorite(this.props.id) : this.props.unfavorite(this.props.id);
    }

    handleSummary = () => {
        this.props.fetchSummary(this.props.id);
    }

    handleReadingRemoval = () => {
        // deleteReading deletes from db, but not from state
        this.props.removeUserReading(this.props.reading.reader, this.props.id);
    }
    
    render() {
    const { id, style, users, reading, summary, removeSummary, loading, currentUser } = this.props;
    
    return (
        <li style={style} className='list-group-item border-secondary'>
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
                {!this.props.isCorrectUser && 
                    <Link to={`/${users[reading.reader].id}`} className='btn text-primary m-2'>
                        <small>{users[reading.reader].username}</small>
                    </Link>    
                }
                <Moment className='text-muted mt-3 ml-2' fromNow ago>
                    {reading.date}
                </Moment> 
                {loading.isLoading && loading.id.includes(id)
                    ? <p className='btn text-muted m-2 ml-auto'>
                        <FontAwesomeIcon icon='spinner' pulse/>
                    </p>
                    : [(!summary.hasOwnProperty('data') || summary.id != id
                        ? <p key='view' onClick={this.handleSummary} className='btn text-muted m-2 ml-auto'>
                            <FontAwesomeIcon icon='book-reader'/>
                        </p>
                        : <p key='remove' onClick={removeSummary} className='btn text-muted m-2 ml-auto'>
                            <FontAwesomeIcon icon='window-close'/>
                        </p>
                    )]
                }
                {currentUser.user.id === reading.reader && (
                    reading.favorite
                        ? <p onClick={this.handleClick} className='btn text-muted m-2'>
                            <FontAwesomeIcon icon='bookmark'/>
                        </p>
                        : <p onClick={this.handleClick} className='btn text-muted m-2'>
                            <FontAwesomeIcon icon={['far', 'bookmark']}/>
                        </p>
                )}
                {currentUser.user.id === reading.reader && 
                    <p onClick={this.handleReadingRemoval} className='btn text-danger m-2 delete'>
                        <FontAwesomeIcon icon={['far', 'trash-alt']}/>
                    </p>
                }
                {summary.id == reading.id &&
                    <p className='summary-data'>{summary.data}</p>
                }
            </div>
        </li>
    )
}
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.user,
        reading: getReadingById(state, ownProps.list, ownProps.id),
        currentUser: state.currentUser,
        summary: state.summary,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { markFavorite, unfavorite, ...summary.actions, removeUserReading })(ListItem);