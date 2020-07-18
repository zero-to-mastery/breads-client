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
    const { id, style, users, reading, summary, measure } = props;
    return (
        <li style={style} className='list-group-item border-secondary p-0'>
            <img
                src={reading.reading_image || BreadsImage}
                className='card-img'
                onLoad={measure}
            />
            <div className='card-img-overlay special'>
                <h5 className='card-title row m-2'><a href={`${reading.url}`} target='_blank'  rel='noopener noreferrer' className='text-primary'><strong>{reading.title}</strong></a></h5>
                <p className='card-text small m-2'>{reading.description}</p>
                <div className='card-text row m-2'>
                    <p className='lead'>{reading.domain}</p>
                    <p className='text-muted ml-auto'>{Math.round(reading.word_count / 300)} min read</p>             
                </div>
                <div className='card-text row m-2'>
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