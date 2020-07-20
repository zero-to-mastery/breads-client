import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import UserImage from '../../../common/UserImage';
import Summary from './Summary';
import Favorites from './Favorites';
import Delete from './Delete';
import { getReadingById } from '../selectors';
import BreadsImage from '../../../images/breads-wesual-click.jpg'

const ListItem = props => {
    const { id, style, list, users, reading, summary, measure } = props;
    console.log(list == 'global');
    const minutes = Math.round(reading.word_count / 300);

    return (
        <li style={style} className='list-group-item p-0 overflow-hidden'>
            <img
                src={reading.reading_image || BreadsImage}
                className='card-img overflow-hidden'
                onLoad={measure}
            />
            <div className='card-img-overlay special d-flex flex-column justify-content-around m-1'>
                <h5 className='card-title flex-row text-truncate'><a href={`${reading.url}`} target='_blank'  rel='noopener noreferrer' className='text-primary'><strong>{reading.title}</strong></a></h5>
                <div className='card-text flex-row small text-truncate'>{reading.description}</div>
                <div className='card-text row ml-1 mr-1 mt-2'>
                    <p className='lead'>{reading.domain}</p>
                    {minutes > 0 &&
                        <p className='text-muted ml-auto'>{minutes} min read</p>   
                    }          
                </div>
                <div className='card-text row ml-1'>
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
                    <Moment className='text-muted mt-3 ml-2 mr-auto' fromNow ago>
                        {reading.created_at}
                    </Moment> 

                    {minutes > 0 && 
                        <Summary id={id}/>
                    }
                    {(list !== 'global' && list !== 'subscriptions') &&
                        <>
                            <Favorites id={id} reader={reading.reader} favorite={reading.favorite}/>
                            <Delete id={id} reader={reading.reader}/>
                        </>
                    }
                    

                    {summary.id == reading.id &&
                        <p className='summary-data'>{summary.data}</p>
                    }
                </div>
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