import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import { History } from "history";
import { RootState } from "../rootReducer";
import { searchAll, searchUsers } from "./actions";

type SearchFormProps = PropsFromRedux & {
  history: History;
};

interface SearchFormState {
  search: string;
  activeDropdown: "dropdown--show" | "";
}

class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      search: "",
      activeDropdown: "",
    };
  }

  componentDidMount() {
    this.props.searchAll();
  }

  findMatches(wordToMatch: string): any[] {
    if (wordToMatch !== "") {
      let users = this.props.search.users.filter((query: any) => {
        const regex = new RegExp(wordToMatch, "gi");
        return query.first_name.match(regex) || query.last_name.match(regex);
      });
      let readings = this.props.search.readings.filter((query: any) => {
        const regex = new RegExp(wordToMatch, "gi");
        return query.title.match(regex);
      });
      return [...users, ...readings];
    }
    return [];
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      search: e.currentTarget.value,
    });
    if (e.currentTarget.value.length > 0) {
      this.setState({
        activeDropdown: "dropdown--show",
      });
    } else {
      this.setState({
        activeDropdown: "",
      });
    }
    this.findMatches(e.currentTarget.value);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (this.state.search !== "") {
      this.setState({ search: "" });
    }
  };

  render() {
    const { search, activeDropdown } = this.state;
    let searchResults: any[] = [];

    if (search !== "") {
      searchResults = this.findMatches(search).map((query, index) => {
        const regex = new RegExp(`(${search})`, "gi");
        const firstName = reactStringReplace(
          query.first_name,
          regex,
          (match, i) => (
            <span key={i} className="background background--warning">
              {match}
            </span>
          )
        );
        const lastName = reactStringReplace(
          query.last_name,
          regex,
          (match, i) => (
            <span key={i} className="background background--warning">
              {match}
            </span>
          )
        );
        const title = reactStringReplace(query.title, regex, (match, i) => (
          <span key={i} className="background background--warning">
            {match}
          </span>
        ));
        if (title.length > 1) {
          return (
            <li
              key={index + query.title}
              className="dropdown__link text--truncate"
            >
              <a
                href={query.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark"
              >
                {title}
              </a>
            </li>
          );
        }
        if (firstName.length > 1 || lastName.length > 1) {
          return (
            <li
              key={index + query.first_name}
              className="dropdown__link text--truncate"
            >
              <Link to={`/${query.id}`}>
                <span className="name">
                  {firstName} {lastName}
                </span>
              </Link>
            </li>
          );
        } else if (!title.length || !firstName.length || !lastName.length) {
          return (
            <li key={index + "none"} className="dropdown__link text--truncate">
              <span className="name">No results</span>
            </li>
          );
        } else {
          return (
            <li key={index + "none"} className="dropdown__link text--truncate">
              <span className="name">Better luck next time</span>
            </li>
          );
        }
      });
    }

    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
        <label htmlFor="search"></label>
        <div className={`dropdown ${activeDropdown}`} data-toggle="dropdown">
          <div className="navbar__search">
            <input
              type="text"
              className="navbar__search-input"
              id="search"
              name="search"
              onChange={this.handleChange}
              placeholder="Search Breads"
              value={search}
            />
          </div>
          <ul className="dropdown__menu search-results text--truncate">
            {searchResults.length >= 1 ? (
              searchResults
            ) : (
              <span className="dropdown__link">...</span>
            )}
          </ul>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    readings: state.readings,
    search: state.search,
  };
}

const connector = connect(mapStateToProps, { searchAll, searchUsers });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SearchForm);
