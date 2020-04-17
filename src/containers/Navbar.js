import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';
import { withRouter } from 'react-router-dom';
import SearchForm from './SearchForm';
import { fetchNotifications, updateNotifications } from '../store/actions/notifications';

class Navbar extends Component {
    componentDidMount() {
        this.props.fetchNotifications();
    }

    logout = e => {
        e.preventDefault();
        this.props.logout();
        this.props.history.push('/');
    }

    handleClick = e => {
        e.preventDefault();
        this.props.updateNotifications();
    }

    render() {
        const { notifications } = this.props;

        let notificationsList = notifications.map(n => (
            <button key={n.subscriber_id} className='dropdown-item'>
                <span key={n.subscriber_id} className='text-primary'>
                {/* onClick={this.handleClick.bind(n.subscriber_id)} */}
                {n.username}</span> started following you!
            </button>
        ));

        return (
            <nav className='navbar fixed-top navbar-expand-md navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' to='/'>
                        BREADS<small> beta</small>
                    </Link>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='.collapsable' aria-controls='collapsable' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    {this.props.currentUser.isAuthenticated ? (
                        <div className='collapse navbar-collapse collapsable' id='collapsable'>    
                            <SearchForm history={this.props.history}/>
                            <ul className='nav navbar-nav m-auto'>
                                <li>
                                    <NavLink exact to='/' activeClassName='bg-primary text-white' className='btn text-white btn-sm'>
                                        Global
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to={`/${this.props.currentUser.user.id}`} activeClassName='bg-primary text-white' className='btn text-white btn-sm'>
                                        Your Reads
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/subscriptions' activeClassName='bg-primary text-white' className='btn text-white btn-sm'>
                                        Subscriptions
                                    </NavLink>
                                </li>
                            </ul>
                            <button className='btn text-white btn-sm dropdown-toggle' type='button' id='navbarDropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                {!notificationsList.length ? (
                                    <span className='badge badge-pill badge-primary'>{notificationsList.length}</span>
                                ) : (
                                    <span className='badge badge-pill badge-danger'>{notificationsList.length}</span>
                                )}
                            </button>
                            <div onClick={this.handleClick} className='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
                                {!notificationsList.length ? (
                                    <button className='dropdown-item'>
                                        No new subscribers!
                                    </button>
                                ) : ( 
                                    notificationsList
                                )}
                            </div>
                            <button onClick={this.logout} className='btn text-white btn-sm'>
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div className='collapse navbar-collapse' id='collapsable'>
                            <ul className='nav navbar-nav ml-auto'>
                                <li>
                                    <NavLink exact to='/signup' activeClassName='bg-primary text-white' className='btn text-white btn-sm'>
                                        Sign up
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact to='/signin' activeClassName='bg-primary text-white' className='btn text-white btn-sm'>
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