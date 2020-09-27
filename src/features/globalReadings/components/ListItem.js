import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import UserImage from '../../../common/UserImage';
// import Summary from '../../summary/Summary';
import Favorites from './Favorites';
import Delete from './Delete';
import Update from './Update';
import Tags from './Tags';
import { getReadingById } from '../selectors';
import BreadsImage from '../../../images/breads-wesual-click.jpg'

const ListItem = props => {
    const { id, style, list, users, reading, summary, currentUser, outdated, tags, measure } = props;
    const minutes = Math.round(reading.word_count / 300);
    let imageMargin = '';

    function addImageTransformation(image) {
        let imageURL = new URL(image);
        let pathnameArray = imageURL.pathname.split('/');
        let originalPathnameArray = pathnameArray.slice();
        for (let i = 0; i < originalPathnameArray.length; i++) {
            if (pathnameArray[i] === 'upload') {
                pathnameArray.splice(i + 1, 0, 'w_96,h_96,c_fill,g_face');
                imageURL.pathname = pathnameArray.join('/');
                return imageURL.href;
            }
        }
    }

    function serveImageThroughCDN() {
        let width = getImageWidth();
        if (reading && reading.reading_image) {
            return `https://images.weserv.nl/?url=${reading.reading_image}&w=${width}&output=webp`;
        } else {
            return BreadsImage;
        }
    }

    function getImageWidth() {
        if (window.innerWidth <= 767) {
            return 575;
        } else {
            imageMargin = 'm-3';
            return 167;
        }
    }

    let newUserImage = addImageTransformation(users[reading.reader].image);
    let newReadingImage = serveImageThroughCDN();    

    return (
        <li style={{ ...style }}
            className='card border-secondary'
            id='list-item'
        >
            <div className='row'>
                <div className='col-md-4'>
                    <img loading='lazy' src={newReadingImage} onLoad={measure} className={`card-img ${imageMargin}`} alt='Article'></img>
                </div>
                <div className='col-md-8'>
                    <div className='m-3'>
                        <h5 className='card-title flex-row'><a href={`${reading.url}`} target='_blank' rel='noopener noreferrer' className='text-primary'><strong>{reading.title}</strong></a></h5>
                        <div className='card-text flex-row small'>{reading.description}</div>
                        <div className='card-text row ml-1 mr-1 mt-2'>
                            <p className='lead'>{reading.domain}</p>
                            { minutes > 0 && <p className='text-muted ml-auto'>{minutes} min read</p> }          
                        </div>
                    </div>
                </div>
            </div>
            <div className='card-text row flex-nowrap ml-3 mr-3'>
                <UserImage
                    image={newUserImage}
                    username={users[reading.reader].username}
                    className='timeline-image'
                    height='48'
                    width='48'
                />

                {!props.isCorrectUser && 
                    <Link to={`/${users[reading.reader].id}`} className='btn text-primary m-2'>
                        <small>{users[reading.reader].username}</small>
                    </Link>
                }

                <Moment className='text-muted text-nowrap mt-3 ml-2 mr-auto' fromNow ago>
                    {reading.created_at}
                </Moment> 

                {/* {minutes > 0 && 
                    <Summary id={id}/>
                } */}
                {tags && 
                    <Tags reading={reading} tags={tags} list={list}/>
                }
                {(list !== 'global' && list !== 'subscriptions') &&
                    <>
                        <Favorites id={id} reader={reading.reader} favorite={reading.favorite}/>
                        <Delete id={id} reader={reading.reader}/>
                    </>
                }

                {summary.id === reading.id &&
                    <p className='summary-data'>{summary.data}</p>
                }

                {(currentUser.user.id === reading.reader || currentUser.user.id === 1)&& 
                outdated === 'true' &&
                    <Update user_id={reading.reader} reading_id={id} url={reading.url}/>
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
        tags: state.tags
    }
}

export default connect(mapStateToProps)(ListItem);