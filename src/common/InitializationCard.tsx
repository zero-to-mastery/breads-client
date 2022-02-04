import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchReadingsIfNeeded } from "../features/globalReadings/actions";
import { getReadings } from "../features/globalReadings/selectors";
import tags from "../features/tags/index";
import { RootState } from "../features/rootReducer";
import { match } from "react-router-dom";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
  ListRowRenderer,
} from "react-virtualized";
import ListItem from "../features/globalReadings/components/ListItem";
import VirtualizedList from "../features/globalReadings/components/VirtualizedList";

type OwnProps = {
  readings: any;
  list: any;
  id?: any;
  outdated?: any;
  fav?: any;
  tag_id?: any;
  match: match;
};

type ReadingsListProps = PropsFromRedux & OwnProps;

class InitializationCard extends Component<ReadingsListProps> {
  render() {
    let { readings, list, outdated } = this.props;

    if (readings === undefined) {
      return (
        <div className="col col--6-lg col--4-md">
          <div className="newCard">
            <div className="card_body">
              <h3>Welcome</h3>
              <p>You currently do not have any posted readings.</p>
            </div>
          </div>
        </div>
      );
    } else if (readings === undefined && list === "subscriptions") {
      return (
        <div className="col col--6-lg col--4-md">
          <div className="newCard">
            <div className="card_body">
              <h3>Welcome</h3>
              <p>Your friends do not have posted readings.</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <VirtualizedList readings={readings} list={list} outdated={outdated} />
      );
    }
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

export default connector(InitializationCard);
