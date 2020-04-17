import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'; //Redirect
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import Timeline from '../components/Timeline';
import UserAside from '../components/UserAside';
import UserReadingsList from './UserReadingsList';
import PubsList from './PubsList';
import SubscriptionsList from './SubscriptionsList';
import UsersList from './UsersList';
import ArticleForm from './ArticleForm';


const Routes = props => {
    const { authUser, errors, removeError, currentUser, readings } = props;
    return (
        <Switch>
            <Route
                exact
                path='/'
                render={props => {
                    return (
                        <Homepage
                            errors={errors}
                            currentUser={currentUser}
                            {...props}
                        />
                    )
                }}
            />
            <Route
                exact
                path='/signin'
                render={props => {
                    return (
                        <AuthForm
                            onAuth={authUser}
                            removeError={removeError}
                            errors={errors}
                            buttonText='Log In'
                            heading='Welcome Back.'
                            {...props}
                        />
                    )
                }}
            />
            <Route
                exact
                path='/signup'
                render={props => {
                    return (
                        <AuthForm
                            onAuth={authUser}
                            removeError={removeError}
                            errors={errors}
                            signup
                            buttonText='Sign up'
                            heading='Join today!'
                            {...props}
                        />
                    )
                }}
            />
            <Route
                exact
                path='/users'
                render={props => {
                    return (
                        <div>
                            {errors.message && (
                                <div className='alert alert-danger'>{errors.message}</div>
                            )}
                            <Timeline>
                                <UserAside
                                    id={currentUser.user.id}
                                    image={currentUser.user.image}
                                    username={currentUser.user.username}
                                />
                                <UsersList />
                            </Timeline>
                        </div>
                        
                    )
                }}
            />
            <Route
                exact
                path='/subscriptions'
                render={props => {
                    return (
                        <div>
                            {errors.message && (
                                <div className='alert alert-danger'>{errors.message}</div>
                            )}
                            <Timeline>
                                <UserAside
                                    id={currentUser.user.id}
                                    image={currentUser.user.image}
                                    username={currentUser.user.username}
                                />
                                <SubscriptionsList />
                                <ArticleForm history={props.history}/>
                            </Timeline>
                        </div>
                    )
                }}
            />
            <Route
                exact
                path='/:id'
                render={props => {
                    return (
                        <div>
                            {errors.message && (
                                <div className='alert alert-danger'>{errors.message}</div>
                            )}
                            <Timeline>
                                <UserAside
                                    id={currentUser.user.id}
                                    image={currentUser.user.image}
                                    username={currentUser.user.username}
                                    readings={readings}
                                />
                                <UserReadingsList match={props.match}/>
                                <ArticleForm history={props.history}/>
                            </Timeline>
                        </div>
                    )
                }}
            />
            <Route
                exact
                path='/:id/pubs'
                render={props => {
                    return (
                        <div>
                            {errors.message && (
                                <div className='alert alert-danger'>{errors.message}</div>
                            )}
                            <Timeline>
                                <UserAside
                                    id={currentUser.user.id}
                                    image={currentUser.user.image}
                                    username={currentUser.user.username}
                                />
                                <PubsList match={props.match}/>
                            </Timeline>
                        </div>
                    )
                }}
            />
        </Switch>
    );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    readings: state.readings
  };
}

export default withRouter(
  connect(mapStateToProps, { authUser, removeError })(Routes)
);