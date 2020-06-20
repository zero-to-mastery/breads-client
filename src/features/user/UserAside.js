import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import subscriptions from '../subscriptions';
import userReadings from '../userReadings';
import favReadings from '../favReadings';
import { fetchUser } from './actions';
import { getUserById } from './reducer';
import UserImage from '../../common/UserImage';
import Aside from '../../common/Aside';
import ReadingStats from '../../common/ReadingsStats';


class UserAside extends Component {
    componentDidMount() {
        if (this.props.match) {
            this.props.fetchUser(this.props.match.params.id)
            this.props.fetchSubscriptions(this.props.match.params.id);
            this.props.fetchFavoriteReadings(this.props.match.params.id);
            // this.props.fetchUserReadingsIfNeeded('user', this.props.match.params.id);
        } else {
            this.props.fetchSubscriptions(this.props.currentUser.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match && prevProps.match && this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchUser(this.props.match.params.id)
            this.props.fetchSubscriptions(this.props.match.params.id);
            this.props.fetchFavoriteReadings(this.props.match.params.id);
        }
    }

    render() {
        let { currentUser, readings, friends, loading, favorites, user, postNewSubscription } = this.props;
        let totalReadings,
            // totalWebsites,
            // topWebsite,
            totalBooks,
            totalWords = 0,
            totalFavorites;

        let u = {};
        if (user) u = user;
        let image = <UserImage
                        image={u.image}
                        username={u.username}
                        class='card-img-top border-bottom border-secondary'
                    />;
        
        if (readings && readings.length > 0) {
            readings.forEach(r => {
                totalWords += r.word_count/100000;
            }); 

            totalReadings = readings.length;
            // totalWebsites = readings.websites.length;
            // topWebsite = readings.websites[0].domain;
            totalBooks = totalWords.toFixed(2);
        }

        if (favorites) totalFavorites = favorites.length;
        return (
            <Aside
                readings={readings}
                title={u.username}
                id={currentUser.id}
                user_id={u.id}
                favorites={favorites}
                friends={friends}
                image={image}
                newSubscription={postNewSubscription.bind(this, u.id)}
            >
                <NavLink exact to={`/${u.id}`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm readings-sum'>
                    <ReadingStats loading={loading} loading_id='userReadings' statName='Readings' stat={totalReadings}/>
                </NavLink>
                <NavLink exact to={`/${u.id}/favorites`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm favorites-sum'>
                    <ReadingStats loading={loading} loading_id='FavoriteReadings' statName='Favorites' stat={totalFavorites}/>
                </NavLink>
                {/* <ReadingStats loading={loading} loading_id='userReadings' statName='Websites Read From' stat={totalWebsites}/> */}
                {/* <ReadingStats loading={loading} loading_id='userReadings' statName='Most Read Website' stat={topWebsite}/> */}
                <ReadingStats loading={loading} loading_id='userReadings' statName='Loaves' stat={totalBooks}/>
            </Aside>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        favorites: state.favoriteReadings,
        currentUser: state.currentUser.user,
        friends: state.subscriptions,
        user: getUserById(state, ownProps.match.params.id),
        loading: state.loading
    }
}

export default connect(mapStateToProps, { ...subscriptions.actions, ...userReadings.actions, ...favReadings.actions, fetchUser })(UserAside);