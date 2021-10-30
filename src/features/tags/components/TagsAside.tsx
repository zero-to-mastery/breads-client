import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import TagsList from "./TagsList";
import { getMostRecentTagIds, getTopTagsIds } from "../selectors";
import { RootState } from "../../rootReducer";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
