import React, { Suspense, lazy } from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from '../features/auth';
import alerts from '../features/alerts';
import { GlobalReadingsList, GlobalAside } from '../features/globalReadings';
import { TagsAside } from '../features/tags';
import Timeline from '../common/Timeline';
import ArticleForm from '../common/ArticleForm';
import SignUpCard from '../common/SignUpCard';
import Aside from '../common/Aside';
import LeftAside from '../common/LeftAside';
import { RootState } from '../features/rootReducer';

const AuthForm = lazy(() => import('../features/auth/components/AuthForm'));
const EmailForm = lazy(() => import('../features/auth/components/EmailForm'));
const ResetPasswordForm = lazy(() => import('../features/auth/components/ResetPasswordForm'));
const UpdateForm = lazy(() => import('../features/auth/components/UpdateForm'));
const Alert = lazy(() => import('../features/alerts/Alert'));
const SubscriptionsList = lazy(() => import('../features/subscriptions/SubscriptionsList'));
const UserAside = lazy(() => import('../features/user/UserAside'));

type RouteProps = {
    alerts: RootState['alerts']
    currentUser: RootState['currentUser']
}

type TParams = {
    id: string
}

export interface ResetParams {
    username: string
    token: string
}

const Routes: React.FC<RouteProps> = ({alerts, currentUser}) => {
    return (
        <div className='container-sm container-md container py-5'>
            <Suspense fallback={<div></div>}>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={({ match, history }: RouteComponentProps) => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert />
                                }
                                <Timeline>
                                    <LeftAside>
                                        {currentUser.isAuthenticated
                                            ? <ArticleForm history={history}/>
                                            : <SignUpCard />
                                        }
                                    </LeftAside>
                                    <Aside>
                                        <GlobalAside list='global' title='Global Readings'/>
                                    </Aside>
                                    <GlobalReadingsList list='global' match={match}/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/tag/:id'
                    render={({ match, history }: RouteComponentProps<TParams>) => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert />
                                }
                                <Timeline>
                                    <LeftAside>
                                        {currentUser.isAuthenticated
                                            ? <ArticleForm history={history}/>
                                            : <SignUpCard />
                                        }
                                    </LeftAside>
                                    <Aside>
                                        <GlobalAside list='global' tag_id={match.params.id}/>
                                    </Aside>
                                    <GlobalReadingsList list='global' tag_id={match.params.id} match={match}/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/signin'
                    render={(props: RouteComponentProps) => {
                        return (
                            <AuthForm
                                alerts={alerts}
                                signup={false}
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
                    render={(props: RouteComponentProps) => {
                        return (
                            <AuthForm
                                alerts={alerts}
                                signup= {true}
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
                    render={(props: RouteComponentProps) => {
                        return (
                            <EmailForm
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
                    render={({match, history}: RouteComponentProps<ResetParams>) => {
                        return (
                            <ResetPasswordForm 
                                alerts={alerts}
                                buttonText='Save new password'
                                heading='Reset your password'
                                match={match}
                                history={history}
                            />
                        )
                    }}
                
                />
                <Route
                    exact
                    path='/subscriptions'
                    render={({ match, history }: RouteComponentProps) => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert />
                                }
                                <Timeline>
                                    <LeftAside>
                                        {currentUser.isAuthenticated
                                            ? <ArticleForm history={history}/>
                                            : <SignUpCard />
                                        }
                                    </LeftAside>
                                    <Aside>
                                        <GlobalAside list='subscriptions' title="Friend's Readings"/>
                                    </Aside>
                                    <GlobalReadingsList list='subscriptions' match={match}/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id'
                    render={({ match, history }: RouteComponentProps<TParams>) => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert />
                                }
                                <Timeline>
                                    <LeftAside>
                                        {currentUser.isAuthenticated
                                            ? <ArticleForm history={history}/>
                                            : <SignUpCard />
                                        }
                                    </LeftAside>
                                    <Aside>
                                        <UserAside fav='true' match={match}/>
                                    </Aside>
                                    <GlobalReadingsList
                                        list={match.params.id}
                                        id={match.params.id}
                                        match={match}/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id/edit'
                    render={({ history }: RouteComponentProps<TParams>) => {
                        return (
                            <UpdateForm
                                alerts={alerts}
                                buttonText='Update'
                                heading={currentUser.user.username}
                                returnPath={currentUser.user.id}
                                history={history}
                            />
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id/following'
                    render={({ match, history }: RouteComponentProps<TParams>) => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert />
                                }
                                <Timeline>
                                    <LeftAside>
                                        {currentUser.isAuthenticated
                                            ? <ArticleForm history={history}/>
                                            : <SignUpCard />
                                        }
                                    </LeftAside>
                                    <Aside>
                                        <UserAside fav='true' match={match}/>
                                    </Aside>
                                    <SubscriptionsList match={match} sub_type='following'/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id/followers'
                    render={({ match, history }: RouteComponentProps<TParams>) => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert />
                                }
                                <Timeline>
                                    <LeftAside>
                                        {currentUser.isAuthenticated
                                            ? <ArticleForm history={history}/>
                                            : <SignUpCard />
                                        }
                                    </LeftAside>
                                    <Aside>
                                        <UserAside fav='true' match={match}/>
                                    </Aside>
                                    <SubscriptionsList match={match} sub_type='followers'/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id/favorites'
                    render={({ match, history }: RouteComponentProps<TParams>) => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert />
                                }
                                <Timeline>
                                    <LeftAside>
                                        {currentUser.isAuthenticated
                                            ? <ArticleForm history={history}/>
                                            : <SignUpCard />
                                        }
                                    </LeftAside>
                                    <Aside>
                                        <UserAside fav='true' match={match}/>
                                    </Aside>
                                    <GlobalReadingsList
                                        list={match.params.id}
                                        id={match.params.id}
                                        fav='true'
                                        match={match}/>
                                </Timeline>
                            </>
                        )
                    }}
                />
                <Route
                    exact
                    path='/:id/outdated'
                    render={({ match, history }: RouteComponentProps<TParams>) => {
                        return (
                            <>
                                {alerts.message && 
                                    <Alert />
                                }
                                <Timeline>
                                    <LeftAside>
                                        {currentUser.isAuthenticated
                                            ? <ArticleForm history={history}/>
                                            : <SignUpCard />
                                        }
                                    </LeftAside>
                                    <Aside>
                                        <UserAside fav='true' match={match}/>
                                    </Aside>
                                    <GlobalReadingsList
                                        list={match.params.id}
                                        id={match.params.id}
                                        outdated='true'
                                        match={match}/>
                                </Timeline>
                            </>
                        )
                    }}
                />
            </Switch>
            </Suspense>
        </div>
    );
}

function mapStateToProps(state: RootState) {
    return {
        currentUser: state.currentUser,
        alerts: state.alerts
    };
}

export default withRouter(
    connect(mapStateToProps, { ...auth.actions, ...alerts.actions })(Routes)
);