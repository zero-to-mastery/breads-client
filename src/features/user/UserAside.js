import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import subscriptions from '../subscriptions';
import globalReadings from '../globalReadings';
import { fetchUser } from './actions';
import { getUserById } from './selectors';
import UserImage from '../../common/UserImage';
import Aside from '../../common/Aside';
import ReadingStats from '../../common/ReadingsStats';
import { getWebsites } from '../globalReadings/selectors';

const { getReadings } = globalReadings.selectors;
const { getSubscriptions } = subscriptions.selectors;

class UserAside extends Component {
    componentDidMount() {
        if (this.props.match) {
            this.props.fetchUser(this.props.match.params.id)
            this.props.fetchSubscriptions(this.props.match.params.id);
        } else {
            this.props.fetchSubscriptions(this.props.currentUser.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match && prevProps.match && this.props.match.params.id !== prevProps.match.params.id) {
            this.props.fetchUser(this.props.match.params.id)
            this.props.fetchSubscriptions(this.props.match.params.id);
        }
    }

    render() {
        let { currentUser, readings, websites, friends, loading, favorites, user, postNewSubscription } = this.props;
        let totalReadings,
            totalWebsites,
            topWebsite,
            totalBooks,
            totalWords = 0,
            maxReads = 0,
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
            totalWebsites = Object.keys(websites).length;
            totalBooks = totalWords.toFixed(2);

            for (const prop in websites) {
                if (websites[prop] > maxReads) {
                    maxReads = websites[prop];
                    topWebsite = prop;
                }
            }
        }

        if (favorites) totalFavorites = favorites.length;
        return (
            <Aside
                // let aside get these from store like listitem
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
                <ReadingStats loading={loading} loading_id='userReadings' statName='Websites Read From' stat={totalWebsites}/>
                <ReadingStats loading={loading} loading_id='userReadings' statName='Most Read Website' stat={topWebsite}/>
                <ReadingStats loading={loading} loading_id='userReadings' statName='Loaves' stat={totalBooks}/>
            </Aside>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        readings: getReadings(state, ownProps.match.params.id),
        websites: getWebsites(state, ownProps.match.params.id),
        favorites: getReadings(state, ownProps.match.params.id, ownProps.fav),
        currentUser: state.currentUser.user,
        friends: getSubscriptions(state, ownProps.match.params.id),
        user: getUserById(state, ownProps.match.params.id),
        loading: state.loading
    }
}

export default connect(mapStateToProps, { ...subscriptions.actions, ...globalReadings.actions, fetchUser })(UserAside);