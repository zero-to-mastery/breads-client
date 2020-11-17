import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../rootReducer';
import { sendResetEmail } from '../actions';
import { History } from 'history';

type EmailFormProps = PropsFromRedux & {
    heading: any
    buttonText: any
    alerts: RootState['alerts']
    history: History
}

interface EmailFormState {
    email: string
}

class EmailForm extends Component<EmailFormProps, EmailFormState> {
    constructor(props: EmailFormProps) {
        super(props);
        this.state = {
            email: ''
        }
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            email: e.currentTarget.value
        });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { email } = this.state;
        this.props.sendResetEmail(email)
            .then(() => {
                if (this.props.alerts.type === 'danger') throw new Error();
            })
            .then(() => this.props.history.push('/signin'))
            .catch(() => {return});
    }

    render() {
        const { email } = this.state;
        const { heading, buttonText, alerts } = this.props;

        return (
            <div className='card-demo'>
                <div className='card'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='card__header'>
                            <h2>Update {heading}</h2>
                        </div>
                        <div className='card__body'>
                            <label htmlFor='email'>Email: </label>
                            <input
                                autoComplete='off'
                                className='form-input'
                                id='email'
                                name='email'
                                onChange={this.handleChange}
                                type='email'
                                value={email}
                            />
                        </div>
                        <div className='card__footer'>
                            <button type='submit' className='button button--block button--primary'>
                                {buttonText}
                            </button>
                            <NavLink exact to='/signin' className='button button--sm button--block button--outline button--warning margin-top--md'>
                                Return
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const connector = connect(null, { sendResetEmail });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EmailForm);