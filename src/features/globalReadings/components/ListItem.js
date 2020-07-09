import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import UserImage from '../../../common/UserImage';
import Summary from './Summary';
import Favorites from './Favorites';
import Delete from './Delete';
import { getReadingById } from '../selectors';

class ListItem extends Component { // change back to function component
    // decouple/consolidate reading lists - CHECK
        // global and subscription - check
        // fav and user - check
        // user and global - check
    // make each 'handle' function its own component - CHECK
    // new reading adds to db, but not to state - CHECK not really possible because python has to parse url
    // are readingLists in state derived data? no, just arrays. could turn into selectors - CHECK
    // markFav and unFav don't work because there's no favorite reducer now - CHECK
    // deleteReading deletes from db, but not from state - CHECK
    // delete Reading only deletes from one reading list, other's keep the deleted reading - CHECK
    // if I unfollow someone, their readings still show up in my subscription feed <----- see below - CHECK
    // no websites - derived data - CHECK
    // no top website - CHECK




    // if I follow someone, their readings don't get added in feed
        // add reading action and add subscription action
    // if subsReads are empty, it emptys readings state -- this affects logging out too
        // because entities.readings is empty
        // give fetching to the aside instead?
        // aside data is coupled to reading data!
        // happens with subscriptions too
        // if user has no readings, profile doesn't display --> 'cannot read 'filter' of undefined
            // no readings are loaded on 'subscriptions' url
    // make sure listcard, aside work like listitem - pull own data from ids
    // better imports in global readings (loader and errors)
        
    
    // use RESELECT
    
    render() {
        const { id, style, users, reading, summary } = this.props;
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
                        {reading.created_at}
                    </Moment> 

                    <Summary id={id}/>
                    <Favorites id={id} reader={reading.reader} favorite={reading.favorite}/>
                    <Delete id={id} reader={reading.reader}/>

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
    }
}

export default connect(mapStateToProps)(ListItem);