import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSubscriptions } from '../store/actions/users';
import DefaultImage from '../images/default-profile-image.jpg';

class UserAside extends Component {
    componentDidMount() {
        this.props.fetchSubscriptions(this.props.id);
    }

    render() {
        let { id, image, username, readings, match, users } = this.props;
        
        let totalReadings,
            totalWebsites,
            topWebsite,
            totalBooks,
            totalWords = 0,
            user = {},
            user_id;
        
        if (readings && 
            readings.length > 0 &&
            readings[0].data.length > 0) {
            for (const property in readings[0].data) {
                user[property] = readings[0].data[property]
            }
            // make sure image change is consistent with id of user in url
            if (match && match.params.id == user[0].user_id) {
                user_id = id;
                id = user[0].user_id;
                if (user[0].image) image = user[0].image;
                if (user[0].username) username = user[0].username;
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
                        className='card-img-top'
                    />
                    <div className='card-body'>
                        <h5 className='card-title'>{username}</h5>
                        {user_id === id && 
                            <div>
                                <NavLink exact to={`/${id}/edit`} className='badge text-warning'>
                                    Edit
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
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchSubscriptions })(UserAside);