import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/actions/users';
import List from '../components/List';
import ListCard from '../components/ListCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UsersList extends Component {
    render() {
        const { users, loading } = this.props;
        let usersList = users.map(u => (           
            <ListCard
                key={u.id}
                id={u.id}
                first={u.first_name}
                last={u.last_name}
                username={u.username}
                image={u.image}
            />     
        ));
        
        if (loading) {
            return <p className='m-2 m-auto'>
                        <FontAwesomeIcon icon='spinner' pulse/>
                    </p>
        }
            
        return (
            <List list_data={usersList} display='card-columns' />
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        loading: state.loading.isLoading
    }
}

export default connect(mapStateToProps, { fetchUsers })(UsersList);