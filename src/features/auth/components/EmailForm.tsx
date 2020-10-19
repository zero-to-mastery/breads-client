import React, { Component } from 'react';
import Alert from '../../alerts/Alert';
import { RootState } from '../../rootReducer';

interface EmailFormProps {
    heading: any
    buttonText: any
    alerts: RootState['alerts']
    reset: any
    history: any
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
        this.props.reset(email)
        .then(() => this.props.history.push('/'))
        .catch(() => {return});
    }

    render() {
        const { email } = this.state;
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