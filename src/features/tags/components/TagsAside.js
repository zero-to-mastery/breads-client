import React, { Component } from "react";
import { connect } from "react-redux";
import TagsList from "./TagsList";
import { getMostRecentTags, getTopTags } from "../selectors";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TagsAside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTags: "top",
    };
  }

  handleClick = (e) => {
    let name = e.currentTarget.name;
    this.setState((prevState) => ({
      activeTags: prevState.activeTags !== name ? name : "",
    }));
  };

  render() {
    const { mostRecentTags, topTags } = this.props;
    const { activeTags } = this.state;

    let visibleTags = activeTags === "new" ? mostRecentTags : topTags;
    let isHidden = activeTags === "" ? "hidden" : "";
    let activeTop = activeTags === "top" ? "primary" : "secondary";
    let activeNew = activeTags === "new" ? "primary" : "secondary";

    return (
      <>
        <div className="button-group button-group--block">
          <button
            onClick={this.handleClick}
            className={`button button--${activeTop}`}
            name="top"
          >
            Top Tags
          </button>
          <button
            onClick={this.handleClick}
            className={`button button--${activeNew}`}
            name="new"
          >
            New Tags
          </button>
        </div>
        <TagsList tags={visibleTags} isHidden={isHidden} />
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    mostRecentTags: getMostRecentTags(state, ownProps.list, ownProps.user_id),
    topTags: getTopTags(state, ownProps.list, ownProps.user_id),
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(TagsAside);
