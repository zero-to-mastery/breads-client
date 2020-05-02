import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewReading, fetchReadings, fetchUserReadings } from '../store/actions/readings';

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
            setTimeout(() => this.props.fetchReadings(), 5000);
        } else if (path !== '/subscriptions') {
            setTimeout(() => this.props.fetchUserReadings(this.props.currentUser), 5000);
        }
    };

    render() {
        const { url } = this.state;

        return (
            <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2  offset-lg-3 offset-xl-0 order-xl-1'>
                <form onSubmit={this.handleNewUrl}  className='input-group'>
                    <label htmlFor='url'></label>
                    <div className='input-group'>
                        <input
                            type='text'
                            className='form-control form-control-sm'
                            id='url'
                            name='url'
                            onChange={this.handleChange}
                            placeholder='www.coolarticle.com'
                            value={url}
                        />
                        <div className='input-group-append'>
                            <button type='submit' className='btn btn-outline-primary btn-sm'>Submit</button>
                        </div>
                    </div>
                </form>
            </aside>
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.readings,
        currentUser: state.currentUser.user.id
    }
}

export default connect(mapStateToProps, { postNewReading, fetchReadings, fetchUserReadings })(ArticleForm);