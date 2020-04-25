import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
// import { removeLoader } from '../store/actions/loaders';
import { fetchSubscriptions } from '../store/actions/users';
import DefaultImage from '../images/default-profile-image.jpg';

class UserAside extends Component {
    componentDidMount() {
        // this.props.removeLoader();
        this.props.fetchSubscriptions(this.props.id);
    }

    render() {
        let { id, image, username, readings, match, users } = this.props;

        let totalReadings,
            totalBooks,
            totalWebsites,
            topWebsite,
            totalWords = 0,
            user = {},
            user_id;

        if (readings) {
            for (const property in readings[0].data) {
                user[property] = readings[0].data[property]
            }
            // make sure image change is consistent with id of user in url
            if (match.params.id == user.user_id) {
                user_id = id;
                id = user.user_id;
                if (user.image) image = user.image;
                if (user.username) username = user.username;
            }

            readings[0].data.forEach(r => {
                totalWords += r.word_count/100000;
            });

            totalReadings = <p className='card-text reading-sum'>Readings: <strong>{readings[0].data.length}</strong></p>;
            totalWebsites = <p className='card-text website-sum'>Websites Read From: <strong>{readings[0].websites.length}</strong></p>;
            topWebsite = <p className='card-text website-sum'>Most Read Website: <strong>{readings[0].websites[0].domain}</strong></p>;
            totalBooks = <p className='card-text book-sum'>Book Equivalents: <strong>{totalWords.toFixed(2)}</strong></p>;
        }
        return (
            <aside className='col-lg-3 col-sm-10 offset-sm-1 offset-lg-0'>
                {/* position-fixed */}
                <div className='card'>
                    <img
                        src={image || DefaultImage}
                        alt={username}
                        className='img-thumbnail'
                    />
                    <div className='card-body'>
                        <h5 className='card-title'>{username}</h5>
                        {user_id === id && 
                            <div>
                                <NavLink exact to={`/${id}/edit`} className='text-muted'>
                                    <small>Edit</small>
                                </NavLink>
                                <NavLink exact to={`/${id}/subscriptions`} activeClassName='badge badge-primary' className='badge'>
                                    Subscriptions: {users.length}
                                </NavLink>
                            </div>
                        }
                        <div>
                            {totalReadings}
                            {totalWebsites}
                            {topWebsite}
                            {totalBooks}
                        </div>
                    </div>
                </div>
            </aside>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        // isLoading: state.isLoading,
        users: state.users,
    }
}

export default connect(mapStateToProps, { fetchSubscriptions })(UserAside); // removeLoader,