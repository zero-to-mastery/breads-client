import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import modals from "../../modals";
import { Modal } from "../../modals";
import { RootState } from "../../rootReducer";

type TagsProps = PropsFromRedux & {
  reading: any;
  tags: any;
  list: any;
};

class Tags extends Component<TagsProps> {
  handleClick = () => {
    let tag_names: any[] = this.props.reading.tags
      ? this.props.reading.tags.map(
          (tag_id: number): string => `#${this.props.tags[tag_id].tag_name}`
        )
      : [];
    this.props.addModalAlert(<Modal />, this.props.reading.id, tag_names);
  };

  render() {
    const { currentUser, reading, tags, list } = this.props;

    let tag_links;
    if (reading.tags && tags) {
      tag_links = reading.tags.map(
        (tag_id: number): React.ReactNode | string => {
          if (tags[tag_id]) {
            return (
              <Link to={`/tag/${tags[tag_id].id}`} key={tag_id}>
                {` #${tags[tag_id].tag_name}`}
              </Link>
            );
          } else {
            return "";
          }
        }
      );
    }

    return (
      <span>
        {currentUser?.id === reading.reader &&
          list !== "global" &&
          list !== "subscriptions" && (
            <FontAwesomeIcon
              onClick={this.handleClick}
              icon="plus"
              size="sm"
              data-toggle="modal"
              data-target="#exampleModal"
            />
          )}
        {tag_links}
      </span>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser.user,
  };
}

const connector = connect(mapStateToProps, { ...modals.actions });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Tags);
