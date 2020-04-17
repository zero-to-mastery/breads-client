import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/actions/users';
import List from '../components/List';
import ListCard from '../components/ListCard';

class UsersList extends Component {
    render() {
        const { users } = this.props;
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
        return (
            <List list_data={usersList} display='card-columns' />
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { fetchUsers })(UsersList);