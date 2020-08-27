import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import auth, { AuthForm, EmailForm, ResetPasswordForm, UpdateForm } from '../features/auth';
import alerts, { Alert } from '../features/alerts';
import { GlobalReadingsList, GlobalAside } from '../features/globalReadings';
import { SubscriptionsList } from '../features/subscriptions';
import { TagsAside } from '../features/tags';
import { UserAside } from '../features/user';
import Timeline from '../common/Timeline';
import ArticleForm from '../common/ArticleForm';
import SignUpCard from '../common/SignUpCard';
import Aside from '../common/Aside';

const Routes = props => {
    const { authUser, alerts, removeAlert, sendResetEmail, resetPassword, currentUser } = props;
    return (
        <div className='container-fluid py-5'>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={props => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert alerts={alerts} removeAlert={removeAlert}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history}/>
                                        : <SignUpCard />
                                    }
                                    <Aside>
                                        <GlobalAside list='global' title='Global Readings' match={props.match}/>
                                        <TagsAside list='global'/>
                                    </Aside>
                                    <GlobalReadingsList list='global' match={props.match}/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/tag/:id'
                    render={props => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert alerts={alerts} removeAlert={removeAlert}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history}/>
                                        : <SignUpCard />
                                    }
                                    <Aside>
                                        <GlobalAside
                                            list='global'
                                            tag_id={props.match.params.id}
                                        />
                                        <TagsAside list='global'/>
                                    </Aside>
                                    <GlobalReadingsList list='global' tag_id={props.match.params.id} match={props.match}/>
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
                                removeAlert={removeAlert}
                                alerts={alerts}
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
                                removeAlert={removeAlert}
                                alerts={alerts}
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
                                removeAlert={removeAlert}
                                alerts={alerts}
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
                                removeAlert={removeAlert}
                                alerts={alerts}
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
                                {alerts.message && 
                                    <Alert alerts={alerts} removeAlert={removeAlert}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history}/>
                                        : <SignUpCard />
                                    }
                                    <Aside>
                                        <GlobalAside list='subscriptions' title="Friend's Readings" match={props.match} />
                                        <TagsAside list='subscriptions'/>
                                    </Aside>
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
                                {alerts.message && 
                                    <Alert alerts={alerts} removeAlert={removeAlert}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history} match={props.match}/>
                                        : <SignUpCard />
                                    }
                                    <Aside>
                                        <UserAside fav='true' match={props.match}/>
                                        <TagsAside list={props.match.params.id} user_id={props.match.params.id} />
                                    </Aside>
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
                                removeAlert={removeAlert}
                                alerts={alerts}
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
                    path='/:id/following'
                    render={props => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert alerts={alerts} removeAlert={removeAlert}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history} match={props.match}/>
                                        : <SignUpCard />
                                    }
                                    <Aside>
                                        <UserAside fav='true' match={props.match}/>
                                        <TagsAside/>
                                    </Aside>
                                    <SubscriptionsList match={props.match} sub_type='following'/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id/followers'
                    render={props => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert alerts={alerts} removeAlert={removeAlert}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history} match={props.match}/>
                                        : <SignUpCard />
                                    }
                                    <Aside>
                                        <UserAside fav='true' match={props.match}/>
                                        <TagsAside/>
                                    </Aside>
                                    <SubscriptionsList match={props.match} sub_type='followers'/>
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
                                {alerts.message && 
                                    <Alert alerts={alerts} removeAlert={removeAlert}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history} match={props.match}/>
                                        : <SignUpCard />
                                    }
                                    <Aside>
                                        <UserAside fav='true' match={props.match}/>
                                        <TagsAside list={props.match.params.id}/>
                                    </Aside>
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
                <Route
                    exact
                    path='/:id/outdated'
                    render={props => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert alerts={alerts} removeAlert={removeAlert}/>
                                }
                                <Timeline>
                                    {currentUser.isAuthenticated
                                        ? <ArticleForm history={props.history} match={props.match}/>
                                        : <SignUpCard />
                                    }
                                    <Aside>
                                        <UserAside fav='true' match={props.match}/>
                                        <TagsAside/>
                                    </Aside>
                                    <GlobalReadingsList
                                        list={props.match.params.id}
                                        id={props.match.params.id}
                                        outdated='true'
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
        alerts: state.alerts
    };
}

export default withRouter(
    connect(mapStateToProps, { ...auth.actions, ...alerts.actions })(Routes)
);