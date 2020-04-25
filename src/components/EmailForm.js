import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { email } = this.state;
        this.props.reset(email)
        .then(() => {
            this.props.history.push('/');
        })
        .catch(() => {
            return; // ???
        });
    }

    render() {
        const { email } = this.state;
        const { heading, buttonText, errors, history, removeError } = this.props;

        history.listen(() => {
            removeError();
        });

        return (
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && (
                                <div className='alert alert-danger'>{errors.message}</div>
                            )}
                            <label htmlFor='email'>Email:</label>
                            <input
                                autoComplete='off'
                                className='form-control'
                                id='email'
                                name='email'
                                onChange={this.handleChange}
                                type='email'
                                value={email}
                            />
                            <button type='submit' className='btn btn-primary btn-block btn-lg'>
                                {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmailForm;