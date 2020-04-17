import React from 'react';
import { Link } from 'react-router-dom';
import Timeline from './Timeline';
import UserAside from './UserAside';
import ReadingsList from '../containers/ReadingsList';
import ArticleForm from '../containers/ArticleForm';


const Homepage = props => { //({ errors, currentUser })
    if (!props.currentUser.isAuthenticated) {
        return (
            <div className='home-hero'>
                <h1>What's Happening?</h1>
                <h4>New to READINGS?</h4>
                <Link to='/signup' className='btn btn-primary'>
                    Sign up here
                </Link>
            </div>
        );
    }
    return (
        <div>
            {props.errors.message && (
                <div className='alert alert-danger'>{props.errors.message}</div>
            )}
            <Timeline>
                <UserAside 
                    id={props.currentUser.user.id}
                    image={props.currentUser.user.image}
                    username={props.currentUser.user.username}
                />
                <ReadingsList />
                <ArticleForm history={props.history}/>
            </Timeline>
        </div>
    )
}

export default Homepage;