import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { match } from 'react-router-dom';
import { History } from 'history';
import { ResetParams } from '../../../app/Routes';
import { RootState } from '../../rootReducer';

import Alert from '../../alerts/Alert';
import { resetPassword } from '../actions';

type ResetPasswordFormProps = PropsFromRedux & {
    heading: string
    buttonText: string
    alerts: RootState['alerts']
    match: match<ResetParams>
    history: History
}

interface ResetPasswordFormState {
    password: string
}

class ResetPasswordForm extends Component<ResetPasswordFormProps, ResetPasswordFormState> {
    constructor(props: ResetPasswordFormProps) {
        super(props);
        this.state = {
            password: ''
        }
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            password: e.currentTarget.value
        });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { password } = this.state;
        const { username, token } = this.props.match.params;

        this.props.resetPassword(username, token, password)
            .then(() => this.props.history.push('/'))
            .catch(() => {return});
    }

    render() {
        const { password } = this.state;
        const { heading, buttonText, alerts } = this.props;

        return (
            <div>
                <div className='row justify-content-md-center text-center'>
                    <div className='col-md-6'>
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {alerts.message && 
                                <Alert />
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

const connector = connect(null, { resetPassword });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ResetPasswordForm);