import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSubscriptions, postNewSubscription } from '../store/actions/subscriptions';
import { fetchUserReadings } from '../store/actions/userReadings';
import { fetchFavoriteReadings } from '../store/actions/favoriteReadings';
import { fetchUser } from '../store/actions/user';
import UserImage from '../components/UserImage';
import Aside from '../components/Aside';
import ReadingStats from '../components/ReadingsStats';


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
        let {  currentUser, readings, friends, loading, favorites, user, postNewSubscription } = this.props;
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

            totalReadings = readings.data.length;
            totalWebsites = readings.websites.length;
            topWebsite = readings.websites[0].domain;
            totalBooks = totalWords.toFixed(2);
        }

        if (favorites) totalFavorites = favorites.length;

        return (
            <Aside
                readings={readings}
                title={user.username}
                id={currentUser.id}
                user_id={user.id}
                favorites={favorites}
                friends={friends}
                image={image}
                newSubscription={postNewSubscription.bind(this, user.id)}
            >
                <NavLink exact to={`/${user.id}`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm readings-sum'>
                    <ReadingStats loading={loading} loading_id='userReadings' statName='Readings' stat={totalReadings}/>
                </NavLink>
                <NavLink exact to={`/${user.id}/favorites`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm favorites-sum'>
                    <ReadingStats loading={loading} loading_id='FavoriteReadings' statName='Favorites' stat={totalFavorites}/>
                </NavLink>
                <ReadingStats loading={loading} loading_id='userReadings' statName='Websites Read From' stat={totalWebsites}/>
                <ReadingStats loading={loading} loading_id='userReadings' statName='Most Read Website' stat={topWebsite}/>
                <ReadingStats loading={loading} loading_id='userReadings' statName='Loaves' stat={totalBooks}/>
            </Aside>
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

export default connect(mapStateToProps, { fetchSubscriptions, postNewSubscription, fetchUserReadings, fetchFavoriteReadings, fetchUser })(UserAside);