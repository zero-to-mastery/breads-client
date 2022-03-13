import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchReadingsIfNeeded } from "../actions";
import { getReadings } from "../selectors";
import tags from "../../tags";
import VirtualizedList from "./VirtualizedList";
import { RootState } from "../../rootReducer";
import { match } from "react-router-dom";

type OwnProps = {
  list: any;
  id?: any;
  outdated?: any;
  fav?: any;
  tag_id?: any;
  match: match;
};

type ReadingsListProps = PropsFromRedux & OwnProps;

class ReadingsList extends Component<ReadingsListProps> {
  componentDidMount() {
    this.props.fetchTagsIfNeeded(this.props.list, this.props.id);
    this.props.fetchReadingsIfNeeded(this.props.list, this.props.id);
  }

  componentDidUpdate(prevProps: OwnProps) {
    if (this.props.match.url !== prevProps.match.url) {
      this.props.fetchTagsIfNeeded(this.props.list, this.props.id);
      this.props.fetchReadingsIfNeeded(this.props.list, this.props.id);
    }
  }

  render() {
    const { readings, list, outdated } = this.props;
    //console.log(list);
    //console.log(readings);
    //ie so list is global
    return (
      <VirtualizedList readings={readings} list={list} outdated={outdated} />
    );
  }
}

function mapStateToProps(state: RootState, ownProps: OwnProps) {
  return {
    readings: getReadings(
      state,
      ownProps.list,
      ownProps.fav,
      ownProps.outdated,
      ownProps.tag_id
    ),
  };
}

const connector = connect(mapStateToProps, {
  fetchReadingsIfNeeded,
  ...tags.actions,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ReadingsList);
