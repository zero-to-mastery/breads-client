import React from 'react';
// import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultImage from '../images/default-profile-image.jpg';

const ListItem = props => {
    return (
        <li className='list-group-item'>
            <h5 className='row'><a href={`${props.url}`} target='_blank'  rel='noopener noreferrer' className='.text-dark'>{props.title}</a></h5>
            <div className='row reading-area'>
                <p className='lead'>{props.domain}</p>
                <p className='text-muted ml-auto'>~{Number(props.word_count).toLocaleString()} words</p>
            </div>
            <div className='row'>
                <img
                    src={props.image || DefaultImage}
                    alt={props.username}
                    height='100'
                    width='100'
                    className='timeline-image'
                />
                <Link to={`/${props.user_id}`}>
                    <p className='btn text-primary m-2'><small>{props.username}</small></p>
                </Link>
                <p onClick={props.newSubscription} className='btn text-muted m-2 subscribe'><small>Subscribe</small></p>
                {props.summary === '' || props.summary.id != props.id
                    ? <p onClick={props.viewSummary} className='btn text-muted m-2 ml-auto'><small>View Summary</small></p>
                    : <p onClick={props.removeSummary} className='btn text-muted m-2 ml-auto'><small>Remove Summary</small></p>
                }
                {props.isCorrectUser && (
                    <p onClick={props.removeReading} className='btn text-danger m-2 delete'>
                        <small>Delete</small>
                    </p>
                )}
                {props.summary.id == props.id &&
                    <p className='summary-data'>{props.summary.data}</p>
                }
            </div>
        </li>
    )
}

export default ListItem;