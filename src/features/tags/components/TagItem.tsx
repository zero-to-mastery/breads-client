import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTagById } from "../selectors";
import { RootState } from "../../rootReducer";

type TagItemProps = PropsFromRedux & OwnProps;

interface OwnProps {
  key: number;
  id: number;
}

class TagItem extends Component<TagItemProps> {
  render() {
    const { tag, key } = this.props;

    return (
      <li className="menu__list-item" key={key}>
        <NavLink
          exact
          to={`/tag/${tag.id}`}
          activeClassName="menu__link menu__link--active active"
          className="menu__link"
        >
          #{tag.tag_name}
          {tag.count > 1 && <span>{tag.count}</span>}
        </NavLink>
      </li>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    tag: getTagById(state, ownProps.id),
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TagItem);
