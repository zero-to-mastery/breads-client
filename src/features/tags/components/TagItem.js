import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getTagById } from "../selectors";
import { Link } from "@mui/material";
import { ListItem, ListItemIcon, ListItemButton, ListItemText } from "@mui/material";

class TagItem extends Component {
  render() {
    const { tag, key } = this.props;
    
    return (
      <ListItem 
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
            justifyContent: "space-between",
            textDecoration: "none"
          }}
        >
          #{tag.tag_name}
          {tag.count > 1 && <span>{tag.count}</span>}
        </Link>
      </ListItem>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    tag: getTagById(state, ownProps.id),
  };
}

export default connect(mapStateToProps)(TagItem);
