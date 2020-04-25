import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeLoader } from '../store/actions/loaders';
import DefaultImage from '../images/default-profile-image.jpg';

class UserAside extends Component {
    componentDidMount() {
        this.props.removeLoader();
    }

    render() {
        let { id, image, username, readings, isLoading, match } = this.props;

        let totalArticles,
            totalBooks,
            totalWords = 0,
            user = {},
            user_id;

        if (readings) {
            for (const property in readings[0]) {
                user[property] = readings[0][property]
            }
            // make sure image change is consistent with id of user in url
            if (match.params.id == user.user_id) {
                user_id = id;
                id = user.user_id;
                if (user.image) image = user.image;
                if (user.username) username = user.username;
            }

            readings.forEach(r => {
                totalWords += r.word_count/100000;
            });

            totalArticles = <p className='card-text reading-sum'>Readings: <strong>{readings.length}</strong></p>;
            totalBooks = <p className='card-text book-sum'>Loaves: <strong>{totalWords.toFixed(2)}</strong></p>;
        }
        // console.log(isLoading); // why is isLoading undefined??
        if (isLoading) {
            return <div>LOADING</div>
        } else {
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
                                        Subscriptions
                                    </NavLink>
                                </div>
                            }
                            <div>
                                {totalArticles}
                                {totalBooks}
                            </div>
                            
                        </div>
                    </div>
                </aside>
            )
        }
        
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps, { removeLoader })(UserAside);