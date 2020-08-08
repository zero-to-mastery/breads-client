import React, { Component } from 'react';
import Alert from '../../alerts/Alert';

class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { password } = this.state;
        const { username, token } = this.props.match.params;

        this.props.reset(username, token, password)
        .then(() => {
            this.props.history.push('/');
        })
        .catch(() => {
            return; // ???
        });
    }

    render() {
        const { password } = this.state;
        const { heading, buttonText, alerts, history, removeAlert } = this.props;

        // history.listen(() => {
        //     removeAlert();
        // });

        return (
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {alerts.message && 
                                <Alert alerts={alerts} removeAlert={removeAlert}/>
                            }
                            <label htmlFor='password'>Password:</label>
                            <input
                                autoComplete='off'
                                className='form-control'
                                id='password'
                                name='password'
                                onChange={this.handleChange}
                                type='password'
                                value={password}
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