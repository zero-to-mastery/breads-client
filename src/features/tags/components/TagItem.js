import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getTagById } from "../selectors";
import { Link } from "@mui/material";

class TagItem extends Component {
  render() {
    const { tag, key } = this.props;
    
    return (
      <li 
        className="menu__list-item" 
        name={tag.id} 
        key={key}
        style={{
          width: "100%",
        }}
        >
        <Link 
          name={tag.id}
          key={key}
          component={NavLink}
          to={`/tag/${tag.id}`}
          underline="none"
          style={{
            display: "flex",
            color: "grey",
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          #{tag.tag_name}
          {tag.count > 1 && <span>{tag.count}</span>}
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
