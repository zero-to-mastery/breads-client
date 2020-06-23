import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import auth, { AuthForm, EmailForm, ResetPasswordForm, UpdateForm } from '../features/auth';
import errors, { ErrorAlert } from '../features/errors';
import { GlobalReadingsList, GlobalAside } from '../features/globalReadings';
import { SubscriptionsList } from '../features/subscriptions';
import { UserAside } from '../features/user';
import Timeline from '../common/Timeline';
import ArticleForm from '../common/ArticleForm';
import SignUpCard from '../common/SignUpCard';

const Routes = props => {
    const { authUser, errors, removeError, sendResetEmail, resetPassword, currentUser } = props;
    return (
        <div className='container-fluid py-5'>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={props => {
                        return (
                            <>
                                {errors.message && 
                                    <ErrorAlert errors={errors} removeError={removeError}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history}/>
                                        : <SignUpCard />
                                    }
                                    <GlobalAside list='global' title='Global' match={props.match}/>
                                    <GlobalReadingsList list='global' match={props.match}/>
                                </Timeline>
                            </>
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
                    path='/subscriptions'
                    render={props => {
                        return (
                            <>
                                {errors.message && 
                                    <ErrorAlert errors={errors} removeError={removeError}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history}/>
                                        : <SignUpCard />
                                    }
                                    <GlobalAside list='subscriptions' title="Friend's" match={props.match} />
                                    <GlobalReadingsList list='subscriptions' match={props.match}/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id'
                    render={props => {
                        return (
                            <>
                                {errors.message && 
                                    <ErrorAlert errors={errors} removeError={removeError}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history} match={props.match}/>
                                        : <SignUpCard />
                                    }
                                    <UserAside fav='true' match={props.match}/>
                                    <GlobalReadingsList
                                        list={props.match.params.id}
                                        id={props.match.params.id}
                                        match={props.match}/>
                                </Timeline>
                            </>
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
                            <>
                                {errors.message && 
                                    <ErrorAlert errors={errors} removeError={removeError}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history} match={props.match}/>
                                        : <SignUpCard />
                                    }
                                    <UserAside match={props.match}/>
                                    <SubscriptionsList match={props.match}/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id/favorites'
                    render={props => {
                        return (
                            <>
                                {errors.message && 
                                    <ErrorAlert errors={errors} removeError={removeError}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history} match={props.match}/>
                                        : <SignUpCard />
                                    }
                                    <UserAside fav='true' match={props.match}/>
                                    <GlobalReadingsList
                                        list={props.match.params.id}
                                        id={props.match.params.id}
                                        fav='true'
                                        match={props.match}/>
                                </Timeline>
                            </>
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
        errors: state.errors
    };
}

export default withRouter(
    connect(mapStateToProps, { ...auth.actions, ...errors.actions })(Routes)
);