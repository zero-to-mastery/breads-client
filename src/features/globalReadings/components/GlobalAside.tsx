import React, { Fragment } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getReadings, getWebsites } from "../selectors";
import Card from "../../../common/Card";
import TagPairs from "../../../common/TagPairs";
import ReadingStats from "../../../common/ReadingsStats";
import { TagsAside } from "../../tags";
import { getTagById, getPairedTags } from "../../tags/selectors";
import { RootState } from "../../rootReducer";

type OwnProps = {
  list: string;
  title?: any;
  fav?: any;
  outdated?: any;
  tag_id?: any;
  tagPairs: number[];
  tagTitle: string;
};

type GlobalAsideProps = PropsFromRedux & OwnProps;

const GlobalAside: React.FunctionComponent<GlobalAsideProps> = ({
  readings,
  websites,
  loading,
  list,
  title,
  tag,
  tagPairs,
  tag_id,
  tagTitle,
}) => {
  let totalReadings,
    totalWebsites,
    topWebsite,
    totalBooks,
    totalWords = 0,
    maxReads = 0;

  if (readings && readings.length > 0) {
    readings.forEach((r: any): void => {
      totalWords += r.word_count / 100000;
    });

    totalReadings = readings.length;
    totalWebsites = Object.keys(websites).length;
    totalBooks = totalWords.toFixed(2);

    for (const prop in websites) {
      if (websites[prop] > maxReads) {
        maxReads = websites[prop];
        topWebsite = prop;
      }
    }
  }

  if (!title && tagTitle) title = `#${tagTitle.tag_name}`;

  return (
    <Fragment>
      <TagPairs tag_id={tag} tagPairs={tagPairs} />
      <Card username={title}>
        <ReadingStats
          loading={loading}
          loading_id={list}
          statName="Readings"
          stat={totalReadings}
        />
        <ReadingStats
          loading={loading}
          loading_id={list}
          statName="Websites Read From"
          stat={totalWebsites}
        />
        <ReadingStats
          loading={loading}
          loading_id={list}
          statName="Most Read Website"
          stat={topWebsite}
        />
        <ReadingStats
          loading={loading}
          loading_id={list}
          statName="Loaves"
          stat={totalBooks}
        />
        <TagsAside list={list} />
      </Card>
    </Fragment>
  );
};

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    readings: getReadings(
      state,
      ownProps.list,
      ownProps.fav,
      ownProps.outdated,
      ownProps.tag_id
    ),
    websites: getWebsites(state, ownProps.list, ownProps.tag_id),
    loading: state.loading,
    tag: ownProps.tag_id,
    tagTitle: getTagById(state, ownProps.tag_id),
  };
}

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GlobalAside);
