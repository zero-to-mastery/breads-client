import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import tags from '../tags';
import { removeModalAlert } from './actions';
// for whatever reason, importing from the index file returns undefined. But it doesn't in ArticleForm
import { fetchReadings } from '../globalReadings/actions';
import { RootState } from '../rootReducer';

type ModalProps = PropsFromRedux;

type ModalState = {
    newTags: string
    oldTags: string
    [k: string]: string
}

class Modal extends Component<ModalProps, ModalState> {
    constructor(props: ModalProps) {
        super(props);
        this.state = {
            newTags: this.props.modals.tag_names ? this.props.modals.tag_names.join(' ') : '',
            oldTags: this.props.modals.tag_names ? this.props.modals.tag_names.join(' ') : ''
        }
    }

    componentDidUpdate(prevProps: ModalProps) {
        if (this.props.modals.tag_names !== prevProps.modals.tag_names) {
            this.setState({
                newTags: this.props.modals.tag_names ? this.props.modals.tag_names.join(' ') : '',
                oldTags: this.props.modals.tag_names ? this.props.modals.tag_names.join(' ') : ''
            });
        }
    }

    // handleClose = (e: React.MouseEvent<HTMLButtonElement>): void => {
    //     this.props.removeModal();
    // }

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    };

    handleNewTags = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const { add_tags, delete_tags } = this.compareTagArrays(this.state.oldTags.split(' '), this.state.newTags.split(' '));
        const tag_names = this.props.modals.tag_names;

        if (tag_names.length === 0) this.props.postNewTags(this.props.modals.reading_url, add_tags);
        else this.props.updateTags(this.props.modals.reading_url, add_tags, delete_tags);
        
        this.setState({ tags: '' });
        this.props.removeModalAlert();
        setTimeout(() => {
            this.props.fetchTags(this.props.currentUser.user.id, this.props.currentUser.user.id);
            this.props.fetchReadings(null, this.props.currentUser.user.id);
        }, 3500);
    };

    compareTagArrays = (arr1: string[], arr2: string[]) => {
        let add_tags = arr2.filter(tag => !arr1.includes(tag)).join(' ');
        let delete_tags = arr1.filter(tag => !arr2.includes(tag)).join(' ');

        return { add_tags, delete_tags }
    }

    render() {
        let { newTags, oldTags } = this.state;

        return (
            <>
                <input
                    type='text'
                    className='form-input'
                    name='newTags'
                    onChange={this.handleChange}
                    value={newTags}
                />
                <small className='form-text text-muted'>
                    Add, update, and delete tags for this reading above. Separate tags with '#'. (e.g. #fun #learning)
                </small>
                {oldTags === newTags 
                    ? <button onClick={this.handleNewTags} type='button' className='button button--secondary' data-dismiss='modal' disabled>Save changes</button>
                    : <button onClick={this.handleNewTags} type='button' className='button button--primary' data-dismiss='modal'>Save changes</button>
                }
            </>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        currentUser: state.currentUser,
        loading: state.loading,
        modals: state.modals
    }
}

const connector = connect(mapStateToProps, { ...tags.actions, fetchReadings, removeModalAlert });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Modal);