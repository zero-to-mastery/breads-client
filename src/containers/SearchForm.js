import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReadings } from '../store/actions/readings';
import { searchUsers } from '../store/actions/search';
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
        this.props.fetchReadings();
    }

    findMatches(wordToMatch) {
        if (wordToMatch !== '') {
            return this.props.readings.data.reduce((unique, item) => {
                const regex = new RegExp(wordToMatch, 'gi');
                if (item.first_name.match(regex) || item.last_name.match(regex)) {
                    console.log([...new Set(item.first_name)]);
                    return [...new Set(item.first_name)]
                }
                if (item.title.match(regex)) {
                    console.log([...new Set(item.title)])
                    return [...new Set(item.title)]
                }
                // return query.first_name.match(regex) || query.last_name.match(regex) || Object.values(query.title.match(regex));
            }, []);
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
            this.props.searchUsers(this.state.search);
            this.setState({ search: '' });
            this.props.history.push('/users');
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
                
                let item = [];
                if (firstName.length > 1 || lastName.length > 1) {
                    item.push((<li key={index + query.first_name} className='dropdown-item'>
                                    <Link to={`/${query.user_id}`}>
                                        <span className='name'>{firstName} {lastName} </span>
                                    </Link>
                                </li>
                    ));
                }
                if (title.length > 1) {
                    item.push((<li key={index + query.title} className='dropdown-item'>
                                    <a href={query.url} target='_blank'  rel='noopener noreferrer' className='text-dark'>{title}</a>
                                </li>
                    ));
                }

                return [...item];
            });
            console.log(searchResults)
        }

        return (
            <form onSubmit={this.handleSubmit} className='form-inline dropdown' autoComplete='off'>
                <label htmlFor='search'></label>
                <div className='input-group' id='navbarDropdown' data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'>
                    <input
                        type='text'
                        className='form-control form-control-sm'
                        id='search'
                        name='search'
                        onChange={this.handleChange}
                        placeholder='Search for friends'
                        value={search}
                        
                    />
                </div>
                <div className='input-group-append'>
                    <button type='submit' className='btn btn-outline-secondary text-primary btn-sm bg-white'>
                        <FontAwesomeIcon icon='search'/>
                    </button>
                </div>
                <ul className='dropdown-menu border-secondary' role='menu' aria-labelledby='navbarDropdown'>
                    {searchResults.length > 1
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
        readings: state.readings
    }
}

export default connect(mapStateToProps, { searchUsers, fetchReadings })(SearchForm);