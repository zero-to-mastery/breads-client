import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../auth/actions';
import { withRouter } from 'react-router-dom';
import SearchForm from '../search/SearchForm';
import { fetchNotifications, updateNotifications } from './notificationsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navbar extends Component {
    componentDidMount() {
        if (this.props.currentUser.isAuthenticated) {
            this.props.fetchNotifications();
        }
    }

    logout = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }

    handleClick = (index, e) => {
        e.preventDefault();
        this.props.updateNotifications(this.props.notifications[index].subscriber_id);
    }

    render() {
        const { notifications } = this.props;
        let notificationsList = notifications.map((n, index) => (
            <button onClick={(e) => this.handleClick(index, e)} key={n.subscriber_id} className='dropdown-item'>
                <span key={n.subscriber_id} className='text-primary'>
                {n.username}</span> started following you!
            </button>
        ));

        return (
            <nav className='navbar fixed-top navbar-expand-md navbar-primary bg-white border-bottom border-secondary'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/'>
                        <span role='img' aria-label='breads'>🍞</span>
                    </Link>
                    <button className='btn navbar-toggler text-primary ml-auto' type='button' data-toggle='collapse' data-target='.collapsable' aria-controls='collapsable' aria-expanded='false' aria-label='Toggle navigation'>
                        <FontAwesomeIcon icon='bars' size='2x'/>
                    </button>
                    {this.props.currentUser.isAuthenticated ? (
                        <div className='collapse navbar-collapse collapsable' id='collapsable'>
                            <SearchForm history={this.props.history}/>
                            <ul className='nav ml-auto justify-content-end'>
                                <div className='mr-auto'>
                                    <NavLink exact to='/' activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm'>
                                        Global
                                    </NavLink>
                                    <NavLink exact to={`/${this.props.currentUser.user.id}`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm'>
                                        Your Reads
                                    </NavLink>
                                    <NavLink exact to='/subscriptions' activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm'>
                                        Friends
                                    </NavLink>
                                </div>
                                <button className='btn text-primary btn-sm' type='button' id='navbarDropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                    {!notificationsList.length ? (
                                        <FontAwesomeIcon icon={['far', 'bell']} />
                                    ) : (
                                        <FontAwesomeIcon icon='bell' spin />
                                    )}
                                </button>
                                <div className='dropdown-menu dropdown-menu-right border-secondary' aria-labelledby='navbarDropdown'>
                                    {!notificationsList.length ? (
                                        <button className='dropdown-item'>
                                            No new subscribers!
                                        </button>
                                    ) : ( 
                                        notificationsList
                                    )}
                                </div>
                                <button onClick={this.logout} className='btn text-primary btn-sm'>
                                    <FontAwesomeIcon icon='sign-out-alt' />
                                </button>
                            </ul>
                        </div>
                    ) : (
                        <div className='collapse navbar-collapse collapsable' id='collapsable'>
                            <ul className='nav navbar-nav ml-auto'>
                                <li>
                                    <NavLink exact to='/signup' activeClassName='bg-light btn-outline-primary' className='btn text-primary btn-sm'>
                                        Sign up
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/signin' activeClassName='bg-light btn-outline-primary' className='btn text-primary btn-sm'>
                                        Log in
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        notifications: state.notifications
    };
}

export default withRouter(connect(mapStateToProps, { logout, fetchNotifications, updateNotifications })(Navbar));