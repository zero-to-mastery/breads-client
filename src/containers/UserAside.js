import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../store/actions/subscriptions';
import { fetchUserReadings } from '../store/actions/userReadings';
import { fetchFavoriteReadings } from '../store/actions/favoriteReadings';
import { fetchUser } from '../store/actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UserAside extends Component {
    componentDidMount() {
        if (this.props.match) {
            this.props.fetchUser(this.props.match.params.id)
            this.props.fetchSubscriptions(this.props.match.params.id);
            this.props.fetchUserReadings(this.props.match.params.id);
            this.props.fetchFavoriteReadings(this.props.match.params.id);
        } else {
            this.props.fetchSubscriptions(this.props.currentUser.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match && prevProps.match && this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchUser(this.props.match.params.id)
            this.props.fetchSubscriptions(this.props.match.params.id);
            this.props.fetchUserReadings(this.props.match.params.id);
            this.props.fetchFavoriteReadings(this.props.match.params.id);
        }
    }

    render() {
        let {  currentUser, readings, friends, loading, favorites, user } = this.props;
        let totalReadings,
            totalWebsites,
            topWebsite,
            totalBooks,
            totalWords = 0,
            totalFavorites;
        
        if (readings && readings.data.length > 0) {
            readings.data.forEach(r => {
                totalWords += r.word_count/100000;
            });
            
            if (favorites) {
                totalFavorites = <NavLink exact to={`/${user.id}/favorites`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm favorites-sum'>
                                    Favorites: <strong>{favorites.length}</strong>
                                </NavLink>
            }
            totalReadings = <NavLink exact to={`/${user.id}`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm readings-sum'>
                                Readings: <strong>{readings.data.length}</strong>
                            </NavLink>
            totalWebsites = <p className='card-text website-sum'>Websites Read From: <strong>{readings.websites.length}</strong></p>;
            topWebsite = <p className='card-text website-top'>Most Read Website: <strong>{readings.websites[0].domain}</strong></p>;
            totalBooks = <p className='card-text book-sum'>Loaves: <strong>{totalWords.toFixed(2)}</strong></p>;
        }

        return (
            <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0'>
                <div className='card border-secondary'>
                    <img
                        src={user.image}
                        alt={user.username}
                        className='card-img-top border-bottom border-secondary'
                    />
                    <div className='card-body'>
                        <div className='row pl-3 pr-3'>
                            <h5 className='card-title mr-auto'>{user.username}</h5>
                            {currentUser.id === user.id && 
                                <NavLink exact to={`/${user.id}/edit`} className='text-warning'>
                                    <FontAwesomeIcon icon={['far', 'edit']}/>
                                </NavLink>
                            }
                        </div>
                        
                        <NavLink exact to={`/${user.id}/subscriptions`} className='text-primary'>
                            Friends: {friends.length}
                        </NavLink>

                        {loading.isLoading && loading.id === 'userReadings'
                            ? <p className='m-2 m-auto'>
                                <FontAwesomeIcon icon='spinner' pulse/>
                            </p>
                            : <div>
                                {totalReadings}
                                {totalFavorites}
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
        favorites: state.favoriteReadings,
        currentUser: state.currentUser.user,
        friends: state.subscriptions,
        user: state.user,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { fetchSubscriptions, fetchUserReadings, fetchFavoriteReadings, fetchUser })(UserAside);