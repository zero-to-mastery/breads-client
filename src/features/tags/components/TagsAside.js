import React, { Component } from "react";
import { connect } from "react-redux";
import TagsList from "./TagsList";
import { getMostRecentTags, getTopTags } from "../selectors";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from "@mui/material";

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
    let activeTop = activeTags === "top" ? "contained" : "text";
    let activeNew = activeTags === "new" ? "contained" : "text";

    return (
      <>
          <Button 
            variant={activeTop}
            onClick={this.handleClick}
            name="top"
          >
            Top Tags
          </Button>
          <Button
            variant={activeNew}
            onClick={this.handleClick}
            name="new"
          >
            New Tags
          </Button>
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
