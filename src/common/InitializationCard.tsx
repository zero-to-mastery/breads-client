import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchReadingsIfNeeded } from "../features/globalReadings/actions";
import { getReadings } from "../features/globalReadings/selectors";
import tags from "../features/tags/index";
import { RootState } from "../features/rootReducer";
import { match } from "react-router-dom";
import "../index.css";

type OwnProps = {
  list: any;
  id?: any;
  outdated?: any;
  fav?: any;
  tag_id?: any;
  match: match;
};

type ReadingsListProps = PropsFromRedux & OwnProps;

class InitializationCard extends Component<ReadingsListProps> {
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
    let { readings } = this.props;

    const reads = Object.values({ readings });

    if (reads.toString() == "") {
      return (
        <div className="newCard">
          <div className="card_body">
            <h3>Welcome</h3>
            <p>You currently do not have any posted readings.</p>
          </div>
        </div>
      );
    } else {
      return null;
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
