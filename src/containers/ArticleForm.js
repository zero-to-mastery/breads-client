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

    // need to immediately add to readings list

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
            setTimeout(() => this.props.fetchReadings(), 2500);
        } else if (path !== '/subscriptions') {
            setTimeout(() => this.props.fetchUserReadings(this.props.currentUser), 2500);
        }
    };

    render() {
        const { url } = this.state;

        return (
            <aside className='col-lg-3 col-md-10 offset-sm-1 offset-lg-0'>
                <form onSubmit={this.handleNewUrl} className='form-inline'>
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