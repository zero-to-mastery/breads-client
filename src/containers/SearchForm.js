import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../store/actions/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    handleChange = e => {
        this.setState({
            search: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.searchUsers(this.state.search);
        this.setState({ search: '' });
        this.props.history.push('/users');
    }

    render() {
        const { search } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className='form-inline'>
                <label htmlFor='search'></label>
                <div className='input-group'>
                    <input
                        type='text'
                        className='form-control form-control-sm'
                        id='search'
                        name='search'
                        onChange={this.handleChange}
                        placeholder='Search for friends'
                        value={search}
                    />
                    <div className='input-group-append'>
                        <button type='submit' className='btn btn-outline-secondary text-primary btn-sm bg-white'>
                            <FontAwesomeIcon icon='search'/>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.readings
    }
}

export default connect(mapStateToProps, { searchUsers })(SearchForm);