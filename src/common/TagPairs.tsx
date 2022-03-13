import React, { Fragment } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getPairedTags } from "../features/tags/selectors";
import TagItem from "../features/tags/components/TagItem";

interface TagProps {
  tagPairs: number[];
  tag_id: number;
}

type GlobalTagProps = PropsFromRedux & TagProps;

const TagPairs: React.FunctionComponent<GlobalTagProps> = ({
  tagPairs,
  tag_id,
}) => {
  let tagCount = false;

  function toggle(el) {
    let tag = document.getElementById(el);
    if (tag) {
      tag.style.display = tag.style.display === "block" ? "none" : "block";
    }
  }

  return (
    <Fragment>
      {tagPairs[0] ? (
        <div className="wrapper">
          <select
            onClick={() => {
              toggle("pairs-dropdown");
            }}
            className="dropbtn"
          >
            Tag Pairs
          </select>
          <div id="pairs-dropdown" className="dropdown-content">
            <p className="label">Partner tags:</p>
            {tagPairs.map((tag, i) => {
              return (
                <TagItem id={tag} tag={tag} key={tag} tagCount={tagCount} />
              );
            })}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

function mapStateToProps(state: RootState, ownProps: TagProps) {
  return {
    tagPairs: getPairedTags(state, ownProps.tag_id),
    tag: ownProps.tag_id,
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TagPairs);
