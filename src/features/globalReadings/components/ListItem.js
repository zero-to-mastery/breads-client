import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import UserImage from '../../../common/UserImage';
import Summary from './Summary';
import Favorites from './Favorites';
import Delete from './Delete';
import { getReadingById } from '../selectors';

const ListItem = props => {
    const { id, style, users, reading, summary } = props;
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
                {!props.isCorrectUser && 
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

function mapStateToProps(state, ownProps) {
    return {
        users: state.user,
        reading: getReadingById(state, ownProps.list, ownProps.id),
        currentUser: state.currentUser,
        summary: state.summary,
    }
}

export default connect(mapStateToProps)(ListItem);