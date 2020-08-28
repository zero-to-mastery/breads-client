import React, { Component } from 'react';
import { connect } from 'react-redux';
import tags from '../tags';
import globalReadings from '../globalReadings';
import { removeModal } from './actions';

// why is this undefined? it's not in ArticleForm
console.log(globalReadings);

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: ''
        }
    }

    handleClose = e => {
        this.props.removeModal();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleNewTags = e => {
        // e.preventDefault();
        this.props.postNewTags(this.props.modals.modalProps.reading.url, this.state.tags, this.props.currentUser);
        this.setState({ tags: '' });
        this.props.removeModal();
        // update local state
        setTimeout(() => {
            this.props.fetchTags(this.props.currentUser, this.props.currentUser);
            this.props.fetchReadings(this.props.currentUser, this.props.currentUser);
        }, 3500);
    };

    render() {
        const { title, tags } = this.props;
        return (
            <div className='modal fade' id='exampleModal' tabIndex='-1' role='dialog'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
            >
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>{title}</h5>
                            <button onClick={this.handleClose} type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span 
                                aria-hidden='true'
                                >&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                        <input
                            type='text'
                            className='form-control form-control-sm'
                            id='tags'
                            name='tags'
                            onChange={this.handleChange}
                            placeholder='add tags (optional)'
                            value={tags}
                        />
                        <small className='form-text text-muted'>
                            Separate tags with '#'. (e.g. #fun #learning)
                        </small>
                        </div>
                        <div className='modal-footer'>
                            <button onClick={this.handleClose} type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                            <button onClick={this.handleNewTags} type='button' className='btn btn-primary'>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user.id,
        loading: state.loading,
        modals: state.modals
    }
}

export default connect(mapStateToProps, { ...tags.actions, removeModal })(Modal);