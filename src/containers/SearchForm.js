import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchAll, searchUsers } from '../store/actions/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        this.props.searchAll();
    }

    findMatches(wordToMatch) {
        if (wordToMatch !== '') {
            let users = this.props.search.users.filter(query => {
                const regex = new RegExp(wordToMatch, 'gi');
                return query.first_name.match(regex) || query.last_name.match(regex)// || query.title.match(regex);
            });
            let readings = this.props.search.readings.filter(query => {
                const regex = new RegExp(wordToMatch, 'gi');
                return query.title.match(regex);
            });
            return [...users, ...readings];
        }
    }

    handleChange = e => {
        this.setState({
            search: e.target.value
        });
        this.findMatches(e.target.value);
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.search !== '') {
            // this.props.searchUsers(this.state.search);
            this.setState({ search: '' });
            // this.props.history.push('/users');
        }
    }

    render() {
        const { search } = this.state;
        let searchResults = [];

        if (search !== '') {
            searchResults = this.findMatches(search)
            .map((query, index) => {
                const regex = new RegExp(`(${search})`, 'gi');
                const firstName = reactStringReplace(query.first_name, regex, (match, i) => <span key={i} className='bg-warning'>{match}</span>);
                const lastName = reactStringReplace(query.last_name, regex, (match, i) => <span key={i} className='bg-warning'>{match}</span>);
                const title = reactStringReplace(query.title, regex, (match, i) => <span key={i} className='bg-warning'>{match}</span>);
                if (title.length > 1) {
                    return <li key={index + query.title} className='dropdown-item text-truncate'>
                                    <a href={query.url} target='_blank'  rel='noopener noreferrer' className='text-dark'>{title}</a>
                                </li>
                    ;
                }
                if (firstName.length > 1 || lastName.length > 1) {
                    return <li key={index + query.first_name} className='dropdown-item text-truncate'>
                                    <Link to={`/${query.id}`}>
                                        <span className='name'>{firstName} {lastName}</span>
                                    </Link>
                                </li>
                    ;
                }
            });
        }

        return (
            <form onSubmit={this.handleSubmit} className='form-inline dropdown' autoComplete='off'>
                <label htmlFor='search'></label>
                <div className='input-group' id='navbarDropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                    <div className='input-group-prepend'>
                        <button type='submit' className='btn btn-outline-secondary text-primary btn-sm bg-white'>
                            <FontAwesomeIcon icon='search'/>
                        </button>
                    </div>
                    <input
                        type='text'
                        className='form-control form-control-sm'
                        id='search'
                        name='search'
                        onChange={this.handleChange}
                        placeholder='Search Breads'
                        value={search}
                    />
                </div>
                <ul className='dropdown-menu border-secondary search-results overflow-auto' role='menu' aria-labelledby='navbarDropdown'>
                    {searchResults.length >= 1
                        ? searchResults
                        : <button className='dropdown-item avoid-click'>
                            ...
                        </button>
                    }
                </ul>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        readings: state.readings,
        search: state.search
    }
}

export default connect(mapStateToProps, { searchAll, searchUsers })(SearchForm);