import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../store/actions/users';
import { fetchUserReadings } from '../store/actions/readings';
import DefaultImage from '../images/default-profile-image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UserAside extends Component {
    componentDidMount() {
        if (this.props.match) {
            this.props.fetchSubscriptions(this.props.match.params.id);
            this.props.fetchUserReadings(this.props.match.params.id);
        } else {
            this.props.fetchSubscriptions(this.props.currentUser.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match && prevProps.match && this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchSubscriptions(this.props.match.params.id);
            this.props.fetchUserReadings(this.props.match.params.id);
        }
    }

    render() {
        let {  currentUser, readings, match, users, loading } = this.props;
        let totalReadings,
            totalWebsites,
            topWebsite,
            totalBooks,
            totalWords = 0,
            id = currentUser.id,
            image = currentUser.image,
            username = currentUser.username,
            user = {},
            user_id;
        
        if (readings && readings.data.length > 0) {
            for (const property in readings.data[0]) {
                user[property] = readings.data[0][property]
            }
            // make sure image change is consistent with id of user in url
            if (match && user && match.params.id == user.user_id) {
                user_id = id;
                id = user.user_id;
                image = user.image;
                username = user.username;
            }

            readings.data.forEach(r => {
                totalWords += r.word_count/100000;
            }); 

            totalReadings = <p className='card-text reading-sum'>Readings: <strong>{readings.data.length}</strong></p>;
            totalWebsites = <p className='card-text website-sum'>Websites Read From: <strong>{readings.websites.length}</strong></p>;
            topWebsite = <p className='card-text website-sum'>Most Read Website: <strong>{readings.websites[0].domain}</strong></p>;
            totalBooks = <p className='card-text book-sum'>Loaves: <strong>{totalWords.toFixed(2)}</strong></p>;
        }

        return (
            <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0'>
                <div className='card border-secondary'>
                    <img
                        src={image || DefaultImage}
                        alt={username}
                        className='card-img-top border-bottom border-secondary'
                    />
                    <div className='card-body'>
                        <div className='row pl-3 pr-3'>
                            <h5 className='card-title mr-auto'>{username}</h5>
                            {user_id === id && 
                                <NavLink exact to={`/${id}/edit`} className='text-warning'>
                                    <FontAwesomeIcon icon={['far', 'edit']}/>
                                </NavLink>
                            }
                        </div>
                        
                        <NavLink exact to={`/${id}/subscriptions`} className='text-primary'>
                            Subscriptions: {users.length}
                        </NavLink>

                        {loading.isLoading && loading.id === 'userReadings'
                            ? <p className='m-2 m-auto'>
                                <FontAwesomeIcon icon='spinner' pulse/>
                            </p>
                            : <div>
                                {totalReadings}
                                {totalWebsites}
                                {topWebsite}
                                {totalBooks}
                            </div>
                        }
                    </div>
                </div>
            </aside>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user,
        users: state.users,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { fetchSubscriptions, fetchUserReadings })(UserAside);