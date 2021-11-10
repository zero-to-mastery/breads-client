import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTagById } from "../selectors";
import { Link, ListItem, ListItemButton } from "@mui/material";

const styles = {
  listItem: {
    width: "100%",
  },
  link: {
    display: "flex",
    color: "grey",
    width: "100%",
    justifyContent: "space-between",
    textDecoration: "none",
  },
};

class TagItem extends Component {
  render() {
    const { tag, key } = this.props;

    return (
      <ListItem name={tag.id} key={key} style={styles.listItem}>
        <ListItemButton>
          <Link
            name={tag.id}
            key={key}
            component={NavLink}
            to={`/tag/${tag.id}`}
            underline="none"
            style={styles.link}
          >
            #{tag.tag_name}
            {tag.count > 1 && <span>{tag.count}</span>}
          </Link>
        </ListItemButton>
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
