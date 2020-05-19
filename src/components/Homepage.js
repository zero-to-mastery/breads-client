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
                <h1>
                    <span role='img' aria-label='breads'>🍞 </span>
                    Welcome to BREADS
                    <span role='img' aria-label='breads'> 🍞</span>
                </h1>
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
                    <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                        {props.errors.message}
                        <button onClick={props.removeError} type='button' className='close' data-dismiss='alert' aria-label='Close'>
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>
            )}
            <Timeline>
                <ArticleForm history={props.history}/>
                <UserAside />
                <ReadingsList />
            </Timeline>
        </div>
    )
}

export default Homepage;