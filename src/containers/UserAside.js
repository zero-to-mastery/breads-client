import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../store/actions/subscriptions';
import { fetchUserReadings } from '../store/actions/userReadings';
import { fetchFavoriteReadings } from '../store/actions/favoriteReadings';
import { fetchUser } from '../store/actions/user';
import UserImage from '../components/UserImage';
import Aside from '../components/Aside';


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

        let image = <UserImage
                        image={user.image}
                        username={user.username}
                        class='card-img-top border-bottom border-secondary'
                    />;
        
        if (readings && readings.data.length > 0) {
            readings.data.forEach(r => {
                totalWords += r.word_count/100000;
            }); 

            totalReadings = <NavLink exact to={`/${user.id}`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm readings-sum'>
                                Readings: <strong>{readings.data.length}</strong>
                            </NavLink>
            totalWebsites = <p className='card-text website-sum'>Websites Read From: <strong>{readings.websites.length}</strong></p>;
            topWebsite = <p className='card-text website-sum'>Most Read Website: <strong>{readings.websites[0].domain}</strong></p>;
            totalBooks = <p className='card-text book-sum'>Loaves: <strong>{totalWords.toFixed(2)}</strong></p>;
        }
        if (favorites) {
            totalFavorites = <NavLink exact to={`/${user.id}/favorites`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm favorites-sum'>
                                Favorites: <strong>{favorites.length}</strong>
                            </NavLink>
        }

        return (
            <Aside
                readings={readings}
                loading={loading}
                loading_id='userReadings'
                title={user.username}
                totalReadings={totalReadings}
                totalWebsites={totalWebsites}
                topWebsite={topWebsite}
                totalBooks={totalBooks}
                totalFavorites={totalFavorites}
                id={currentUser.id}
                user_id={user.id}
                favorites={favorites}
                friends={friends}
                image={image}
            />
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