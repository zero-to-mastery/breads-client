import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTagById } from "../selectors";
import { RootState } from "../../rootReducer";
import {
  Link,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";

type TagItemProps = PropsFromRedux & OwnProps;

interface OwnProps {
  key: number;
  id: number;
}

class TagItem extends Component<TagItemProps> {
  render() {
    const { tag, key } = this.props;

    return (
      <ListItem
        key={key}
        style={{
          width: "100%",
        }}
        disablePadding
      >
        <ListItemButton>
          <Link
            key={key}
            component={NavLink}
            to={`/tag/${tag.id}`}
            underline="none"
            style={{
              display: "flex",
              color: "grey",
              width: "100%",
              justifyContent: "space-between",
              textDecoration: "none",
            }}
          >
            #{tag.tag_name}
            {tag.count > 1 && <span>{tag.count}</span>}
          </Link>
        </ListItemButton>
      </ListItem>
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
