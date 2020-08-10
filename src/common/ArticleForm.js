import React, { Component } from 'react';
import { connect } from 'react-redux';
import globalReadings from '../features/globalReadings/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            tags: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    
    handleNewUrl = e => {
        e.preventDefault();
        this.props.postNewReading(this.state.url, this.state.tags);
        this.setState({ url: '', tags: '' });
        let path = this.props.history.location.pathname;
        
        if (path === '/') {
            setTimeout(() => this.props.fetchReadings('global'), 7500);
        } else if (path !== '/subscriptions') {
            setTimeout(() => this.props.fetchReadings(this.props.currentUser, this.props.currentUser), 7500);
        }
    };

    render() {
        const { url, tags } = this.state;
        const { loading } = this.props;

        return (
            <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0 order-xl-1 mb-2'>
                <form onSubmit={this.handleNewUrl} autoComplete='off'>
                    {/* <label htmlFor='url'></label> */}
                    {/* <div className='input-group'> */}
                        <input
                            type='text'
                            className='form-control form-control-sm mb-2'
                            id='url'
                            name='url'
                            onChange={this.handleChange}
                            placeholder='Paste article url here'
                            value={url}
                        />
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
                        {/* <div className='input-group-append'> */}
                            <button type='submit' className='btn btn-outline-secondary text-primary btn-sm btn-block bg-white mt-1'>
                                {loading.isLoading 
                                // && loading.id.includes('newReading')
                                    ? <FontAwesomeIcon icon='spinner' pulse/>
                                    : <FontAwesomeIcon icon='plus'/>
                                }
                            </button>
                        {/* </div> */}
                    {/* </div> */}
                </form>
            </aside>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user.id,
        loading: state.loading
    }
}

export default connect(mapStateToProps, { ...globalReadings.actions })(ArticleForm);