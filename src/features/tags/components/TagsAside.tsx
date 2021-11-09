import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import TagsList from "./TagsList";
import { getMostRecentTagIds, getTopTagsIds } from "../selectors";
import { List, Tab, Tabs } from "@mui/material";
import { RootState } from "../../rootReducer";

type TagsAsideState = {
  activeTags: string;
};

type TagsAsideProps = PropsFromRedux & OwnProps;

interface OwnProps {
  list: string;
}

class TagsAside extends Component<TagsAsideProps, TagsAsideState> {
  constructor(props: TagsAsideProps) {
    super(props);
    this.state = {
      activeTags: "top",
    };
  }

  handleClick = (e: React.SyntheticEvent, name: string) => {
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
          style={{
            width: "100%",
          }}
        >
          <Tab
            label="Top"
            value="top"
            style={{
              width: "50%",
            }}
          />
          <Tab
            label="New"
            value="new"
            style={{
              width: "50%",
            }}
          />
        </Tabs>
        <List>
          <TagsList tags={visibleTags} isHidden={isHidden} />
        </List>
      </>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    mostRecentTags: getMostRecentTagIds(state, ownProps.list),
    topTags: getTopTagsIds(state, ownProps.list),
    loading: state.loading,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps)(TagsAside);
