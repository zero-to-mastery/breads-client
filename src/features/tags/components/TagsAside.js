import React, { Component } from "react";
import { connect } from "react-redux";
import TagsList from "./TagsList";
import { getMostRecentTags, getTopTags } from "../selectors";
import { List, Tab, Tabs } from "@mui/material";

const styles = {
  tabsContainer: {
    width: "100%",
  },
  tabs: {
    width: "50%",
  },
};

class TagsAside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTags: "top",
    };
  }

  handleClick = (_, name) => {
    this.setState((prevState) => ({
      activeTags: prevState.activeTags !== name ? name : "",
    }));
  };

  render() {
    const { mostRecentTags, topTags } = this.props;
    const { activeTags } = this.state;

    let visibleTags = activeTags === "new" ? mostRecentTags : topTags;
    let isHidden = activeTags === "" ? "hidden" : "";

    return (
      <>
        <Tabs
          value={activeTags}
          onChange={this.handleClick}
          textColor="primary"
          indicatorColor="primary"
          style={styles.tabsContainer}
        >
          <Tab label="Top" value="top" style={styles.tabs} />
          <Tab label="New" value="new" style={styles.tabs} />
        </Tabs>
        <List dense={true}>
          <TagsList tags={visibleTags} isHidden={isHidden} />
        </List>
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
