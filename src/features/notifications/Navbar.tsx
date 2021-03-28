import React, { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import auth from '../auth';
import { SearchForm } from '../search';
import { fetchNotifications, updateNotifications } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '../rootReducer';
import { History } from 'history';
import { NotificationType } from './types';

type NotificationState = {
    activeHamburger: string
}

type NotificationProps = PropsFromRedux & {
    history: History
}

class Navbar extends Component<NotificationProps, NotificationState> {
    constructor(props: NotificationProps) {
        super(props);
        this.state = {
            activeHamburger: ''
        }
    }

    componentDidMount() {
        if (this.props.currentUser.isAuthenticated) {
            this.props.fetchNotifications();
        }
    }

    logout = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }

    handleHamburgerClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        this.setState(prevState => ({
            activeHamburger: prevState.activeHamburger === '' ? 'navbar-sidebar--show' : ''
        }));
    }

    handleNotificationClick = (index: number, e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        this.props.updateNotifications(this.props.notifications[index].subscriber_id);
    }

    render() {
        const { notifications } = this.props;
        const { activeHamburger } = this.state;

        let notificationsList = notifications.map((n: NotificationType, index: number) => (
            <div onClick={(e) => this.handleNotificationClick(index, e)} key={n.subscriber_id} className='dropdown__link'>
                <span key={n.subscriber_id}>
                {n.username}</span> started following you!
            </div>
        ));

        return (
            <nav className={`navbar navbar--light navbar--fixed-top navbar--dark${activeHamburger}`}>
                <div className='navbar__inner'>
                    <div className='navbar__items'>
                        <div onClick={this.handleHamburgerClick} aria-label='Navigation bar toggle' className='navbar__toggle' role='button' tabIndex={0}>
                            <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30' role='img' focusable='false'>
                                <title>Menu</title>
                                <path stroke='currentColor' strokeLinecap='round' strokeMiterlimit='10' strokeWidth='2' d='M4 7h22M4 15h22M4 23h22'></path>
                            </svg>
                        </div>
                        <Link className='navbar__brand' to='/'>
                            <span role='img' className='navbar__logo' aria-label='bread'>🍞</span>
                        </Link>
                        <SearchForm history={this.props.history}/>
                    </div>
                    {this.props.currentUser.isAuthenticated ? (
                        <div className='navbar__items navbar__items--right'>
                            <NavLink exact to='/' activeClassName='navbar__item--active navbar__link' className='navbar__item navbar__link'>
                                Global
                            </NavLink>
                            <NavLink exact to={`/${this.props.currentUser.user.id}`} activeClassName='navbar__item--active navbar__link' className='navbar__item navbar__link'>
                                Your Reads
                            </NavLink>
                            <NavLink exact to='/subscriptions' activeClassName='navbar__item--active navbar__link' className='navbar__item navbar__link'>
                                Friends
                            </NavLink>
                            <div className='navbar__item dropdown dropdown--hoverable dropdown--right navbar__link'>
                                <div className='navbar__item'>
                                    {!notificationsList.length ? (
                                        <FontAwesomeIcon icon={['far', 'bell']} />
                                    ) : (
                                        <FontAwesomeIcon icon='bell' spin />
                                    )}
                                </div>
                                <ul className='dropdown__menu'>
                                    {!notificationsList.length ? (
                                        <li className='dropdown__link'>
                                            No new subscribers!
                                        </li>
                                    ) : ( 
                                        notificationsList
                                    )}
                                </ul>
                            </div>
                            <div onClick={this.logout} className='navbar__item navbar__link'>
                                <FontAwesomeIcon icon='sign-out-alt' />
                            </div>
                        </div>
                    ) : (
                        <div className='navbar__items navbar__items--right'>
                            <NavLink exact to='/signup' activeClassName='navbar__item--active navbar__link' className='navbar__item navbar__link'>
                                Sign up
                            </NavLink>
                            <NavLink exact to='/signin' activeClassName='navbar__item--active navbar__link' className='navbar__item navbar__link'>
                                Log in
                            </NavLink>
                        </div>
                    )}
                </div>
                <div role='presentation' className='navbar-sidebar__backdrop'></div>
                <div onClick={this.handleHamburgerClick} className='navbar-sidebar'>
                    <div className='navbar-sidebar__brand'>
                        <Link className='navbar__brand' to='/'>
                            <span role='img' className='navbar__logo' aria-label='bread'>🍞</span>
                        </Link>
                    </div>
                    <div className='navbar-sidebar__items'>
                        <div className='menu'>
                            <ul className='menu__list'>
                                {this.props.currentUser.isAuthenticated ? (
                                    <>
                                        <NavLink exact to='/' className='menu__list-item menu__link'>
                                            Global
                                        </NavLink>
                                        <NavLink exact to={`/${this.props.currentUser.user.id}`} className='menu__list-item menu__link'>
                                            Your Reads
                                        </NavLink>
                                        <NavLink exact to='/subscriptions' className='menu__list-item menu__link'>
                                            Friends
                                        </NavLink>
                                        <div onClick={this.logout} className='menu__list-item menu__link'>
                                            <small>Sign out</small>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <NavLink exact to='/signup' className='menu__list-item menu__link'>
                                            Sign up
                                        </NavLink>
                                        <NavLink exact to='/signin' className='menu__list-item menu__link'>
                                            Log in
                                        </NavLink>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        currentUser: state.currentUser,
        notifications: state.notifications
    };
}

const connector = connect(mapStateToProps, { ...auth.actions, fetchNotifications, updateNotifications });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(Navbar));