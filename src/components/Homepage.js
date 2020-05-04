import React from 'react';
import { Link } from 'react-router-dom';
import Timeline from './Timeline';
import UserAside from '../containers/UserAside';
import ReadingsList from '../containers/ReadingsList';
import ArticleForm from '../containers/ArticleForm';

const Homepage = props => {
    if (!props.currentUser.isAuthenticated) {
        return (
            <div className='home-hero text-secondary'>
                <h1>🍞 Welcome to BREADS 🍞</h1>
                <h4>A website to keep track of what you read online</h4>
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
                <ArticleForm history={props.history}/>
                <UserAside 
                    id={props.currentUser.user.id}
                    image={props.currentUser.user.image}
                    username={props.currentUser.user.username}
                />
                <ReadingsList />
                
            </Timeline>
        </div>
    )
}

export default Homepage;