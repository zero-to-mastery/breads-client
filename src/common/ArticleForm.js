import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewReading, fetchReadingsIfNeeded } from '../features/globalReadings/actions';
import { fetchUserReadingsIfNeeded } from '../features/userReadings/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }

    handleChange = e => {
        this.setState({
            url: e.target.value
        });
    };
    
    handleNewUrl = e => {
        e.preventDefault();
        this.props.postNewReading(this.state.url);
        this.setState({ url: '' });
        let path = this.props.history.location.pathname;
        
        if (path === '/') {
            setTimeout(() => this.props.fetchReadingsIfNeeded(), 5000);
        } else if (path !== '/subscriptions') {
            setTimeout(() => this.props.fetchUserReadingsIfNeeded(this.props.currentUser), 5000);
        }
    };

    render() {
        const { url } = this.state;
        const { loading } = this.props;

        return (
            <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0 order-xl-1 mb-2'>
                <form onSubmit={this.handleNewUrl}  className='input-group' autoComplete='off'>
                    <label htmlFor='url'></label>
                    <div className='input-group'>
                        <input
                            type='text'
                            className='form-control form-control-sm'
                            id='url'
                            name='url'
                            onChange={this.handleChange}
                            placeholder='Paste article url here'
                            value={url}
                        />
                        <div className='input-group-append'>
                            <button type='submit' className='btn btn-outline-secondary text-primary btn-sm bg-white'>
                                {loading.isLoading && loading.id.includes('newReading')
                                    ? <FontAwesomeIcon icon='spinner' pulse/>
                                    : <FontAwesomeIcon icon='plus'/>
                                }
                            </button>
                        </div>
                    </div>
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

export default connect(mapStateToProps, { postNewReading, fetchReadingsIfNeeded, fetchUserReadingsIfNeeded })(ArticleForm);