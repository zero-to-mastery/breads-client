import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import { sendResetEmail, resetPassword } from '../store/actions/users';
import Timeline from '../components/Timeline';
import UserAside from './UserAside';
import SubscriptionsAside from './SubscriptionsAside';
import UserReadingsList from './UserReadingsList';
import SubscriptionsList from './SubscriptionsList';
import SubscriptionReadingsList from './SubscriptionReadingsList';
import UsersList from './UsersList';
import ArticleForm from './ArticleForm';
import UpdateForm from './UpdateForm';
import EmailForm from '../components/EmailForm';
import ResetPasswordForm from '../components/ResetPasswordForm';

const Routes = props => {
    const { authUser, errors, removeError, sendResetEmail, resetPassword, currentUser, readings, userReadings } = props;
    return (
        <div className='container-fluid py-5'>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={props => {
                        return (
                            <Homepage
                                errors={errors}
                                removeError={removeError}
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
                                reset={sendResetEmail}
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
                    path='/reset'
                    render={props => {
                        return (
                            <EmailForm
                                reset={sendResetEmail}
                                removeError={removeError}
                                errors={errors}
                                buttonText='Send reset email'
                                heading='Enter email address'
                                {...props}
                            />
                        )
                    }}
                />
                <Route 
                    exact
                    path='/reset/:username/:token'
                    render={props => {
                        return (
                            <ResetPasswordForm 
                                reset={resetPassword}
                                removeError={removeError}
                                errors={errors}
                                buttonText='Save new password'
                                heading='Reset your password'
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
                                    <UserAside />
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
                                    <ArticleForm history={props.history} />
                                    <SubscriptionsAside />
                                    <SubscriptionReadingsList />
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
                                    <ArticleForm history={props.history} match={props.match}/>
                                    <UserAside
                                        readings={userReadings}
                                        match={props.match}
                                    />
                                    <UserReadingsList match={props.match}/>
                                </Timeline>
                            </div>
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id/edit'
                    render={props => {
                        return (
                            <UpdateForm
                                onAuth={authUser}
                                removeError={removeError}
                                errors={errors}
                                buttonText='Update'
                                heading={currentUser.user.username}
                                path={currentUser.user.id}
                                {...props}
                            />
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id/subscriptions'
                    render={props => {
                        return (
                            <div>
                                {errors.message && (
                                    <div className='alert alert-danger'>{errors.message}</div>
                                )}
                                <Timeline>
                                    <UserAside
                                        readings={readings}
                                        match={props.match}
                                    />
                                    <SubscriptionsList match={props.match}/>
                                </Timeline>
                            </div>
                        )
                    }}
                />
            </Switch>
        </div>
    );
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
    readings: state.readings,
    userReadings: state.userReadings
  };
}

export default withRouter(
  connect(mapStateToProps, { authUser, removeError, sendResetEmail, resetPassword })(Routes)
);