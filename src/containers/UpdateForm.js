import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store/actions/auth';
// import PropTypes from 'prop-types';

class UpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.currentUser.user.username,
            image: this.props.currentUser.user.image
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.updateUser(this.props.currentUser.user.id, this.state.image, this.state.username);
    }
    // UPDATE STATE WITH MYSQL DATA
    render() {
        const { username, image } = this.state;
        const { heading, buttonText, errors, history, removeError } = this.props;
        history.listen(() => {
            removeError();
        });

        return (
            <div className='row justify-content-md-center text-center'>
                <div className='col-md-6'>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Update {heading}</h2>
                        {errors.message && (
                            <div className='alert alert-danger'>{errors.message}</div>
                        )}
                        <label htmlFor='image'>Image Url:</label>
                        <input
                            autoComplete='off'
                            className='form-control'
                            id='image'
                            name='image'
                            onChange={this.handleChange}
                            type='text'
                            value={image}
                        />
                        <label htmlFor='username'>Username:</label>
                        <input
                            autoComplete='off'
                            className='form-control'
                            id='username'
                            name='username'
                            onChange={this.handleChange}
                            type='text'
                            value={username}
                        />
                        <button type='submit' className='btn btn-primary btn-block btn-lg'>
                            {buttonText}
                        </button>
                    </form>  
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, { updateUser })(UpdateForm);