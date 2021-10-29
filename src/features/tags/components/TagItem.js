import React, { Component } from "react";
import { connect } from "react-redux";
import { getTagById } from "../selectors";
import { Link } from "@mui/material";

class TagItem extends Component {
  render() {
    const { tag, key } = this.props;

    return (
      <li className="menu__list-item" name={tag.id} key={key}>
        <Link 
          href={`/tag/${tag.id}`}
          name={tag.id}
          key={key}
        >
          #{tag.tag_name}
        </Link>
      </li>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tag: getTagById(state, ownProps.id),
  };
}

export default connect(mapStateToProps)(TagItem);
