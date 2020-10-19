import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { History } from 'history';
import { RootState } from '../../rootReducer';

import Alert from '../../alerts/Alert';
import { updateUser } from '../actions';

type UpdateFormProps = PropsFromRedux & {
    heading: string | null
    returnPath: number | null
    buttonText: string
    alerts: RootState['alerts']
    history: History
}

interface UpdateFormState {
    username: any
    image: any
    [k: string]: any
}

class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
    constructor(props: UpdateFormProps) {
        super(props);
        this.state = {
            username: this.props.currentUser.user.username,
            image: this.props.currentUser.user.image
        }
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.updateUser(this.props.currentUser.user.id, this.state.image, this.state.username)
            .then(() => this.props.history.push(`/${this.props.currentUser.user.id}`))
            .catch(() => {return});
    }

    render() {
        const { username, image } = this.state;
        const { heading, returnPath, buttonText, alerts } = this.props;

        return (
            <div className='row justify-content-md-center text-center'>
                <div className='col-md-6'>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Update {heading}</h2>
                        {alerts.message && 
                            <Alert />
                        }
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
                        <button type='submit' className='btn btn-primary btn-block btn-lg mt-2'>
                            {buttonText}
                        </button>
                    </form>
                    <NavLink exact to={`/${returnPath}`} className='btn btn-warning btn-block mt-2'>
                        Return
                    </NavLink>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        currentUser: state.currentUser
    };
}

const connector = connect(mapStateToProps, { updateUser });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UpdateForm);