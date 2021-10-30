import React from "react";
import { Tag } from "../types";
import TagItem from "./TagItem";

type TagsListProps = {
  tags: number[] | undefined;
  isHidden: string;
};

const TagsList: React.FC<TagsListProps> = ({ tags, isHidden }) => {
  let tagsList;
  if (tags) {
    tagsList = tags.map((tag) => {
      return <TagItem id={tag} key={tag} />;
    });
  }

  return <div className={`menu__list ${isHidden}`}>{tagsList}</div>;
};

export default TagsList;
