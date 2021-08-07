import React from "react";
import TagItem from "./TagItem";

const TagsList = ({ tags, isHidden }) => {
  let tagsList;
  if (tags) {
    tagsList = tags.map((id) => {
      return <TagItem id={id} key={id} />;
    });
  }

  return <div className={`menu__list ${isHidden}`}>{tagsList}</div>;
};

export default TagsList;
