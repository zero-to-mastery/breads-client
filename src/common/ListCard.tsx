import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import DefaultImage from '../images/default-profile-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '../features/rootReducer';
import UserImage from './UserImage';

type ListCardProps = PropsFromRedux & {
    id: any,
    users: any,
    subscribed: any,
    removeSubscription: any,
}

const ListCard: React.FunctionComponent<ListCardProps> = ({ id, users, subscribed, removeSubscription }) => {
    return (
        <div className='card-demo-md'>
            <div className='card'>
                <div className='card__header'>
                        <UserImage image={users[id].image} username={users[id].username} imageSize='xl'>
                            <div className='avatar__intro'>
                                <Link to={`/${id}`}>
                                    <h4 className='avatar__name'>{users[id].username}</h4>
                                </Link>
                                <small className='avatar__subtitle overflow-auto-horizontal'>
                                    {subscribed && (
                                        <small onClick={removeSubscription} className='text-danger unsubscribe'>
                                            Unsubscribe
                                        </small>
                                    )}
                                </small>
                            </div>
                        </UserImage>
                </div>
                <div className='card__body'>
                    More info about the user will appear here.
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state: RootState) {
    return {
        users: state.user
    }
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ListCard);