import React, { Component } from 'react';
import { connect } from 'react-redux';
import tags from '../tags';
import { removeModal } from './actions';
// for whatever reason, importing from the index file returns undefined. But it doesn't in ArticleForm
import { fetchReadings } from '../globalReadings/actions';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTags: '',
            oldTags: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.modals.modalProps.tag_names !== prevProps.modals.modalProps.tag_names) {
            this.setState({
                newTags: this.props.modals.modalProps.tag_names ? this.props.modals.modalProps.tag_names.join(' ') : '',
                oldTags: this.props.modals.modalProps.tag_names ? this.props.modals.modalProps.tag_names.join(' ') : ''
            });
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
        const { add_tags, delete_tags } = this.compareTagArrays(this.state.oldTags.split(' '), this.state.newTags.split(' '));
        const tag_names = this.props.modals.modalProps.tag_names;

        if (tag_names.length === 0) this.props.postNewTags(this.props.modals.modalProps.reading.url, add_tags);
        else this.props.updateTags(this.props.modals.modalProps.reading.url, add_tags, delete_tags);
        
        this.setState({ tags: '' });
        this.props.removeModal();
        setTimeout(() => {
            this.props.fetchTags(this.props.currentUser, this.props.currentUser);
            this.props.fetchReadings(this.props.currentUser, this.props.currentUser);
        }, 3500);
    };

    compareTagArrays = (arr1, arr2) => {
        let add_tags = arr2.filter(tag => !arr1.includes(tag)).join(' ');
        let delete_tags = arr1.filter(tag => !arr2.includes(tag)).join(' ');

        return { add_tags, delete_tags }
    }

    render() {
        const { title } = this.props;
        let { newTags, oldTags } = this.state;

        return (
            <div className='modal fade' id='exampleModal' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title' id='exampleModalLabel'>{title}</h5>
                            <button onClick={this.handleClose} type='button' className='close' data-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                        <input
                            type='text'
                            className='form-control form-control-sm'
                            id='tags-modal'
                            name='newTags'
                            onChange={this.handleChange}
                            value={newTags}
                        />
                        <small className='form-text text-muted'>
                            Add, update, and delete tags for this reading above. Separate tags with '#'. (e.g. #fun #learning)
                        </small>
                        </div>
                        <div className='modal-footer'>
                            <button onClick={this.handleClose} type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                            {oldTags === newTags 
                                ? <button onClick={this.handleNewTags} type='button' className='btn btn-outline-primary' data-dismiss='modal' disabled>Save changes</button>
                                : <button onClick={this.handleNewTags} type='button' className='btn btn-primary' data-dismiss='modal'>Save changes</button>

                            }
                            
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

export default connect(mapStateToProps, { ...tags.actions, fetchReadings, removeModal })(Modal);