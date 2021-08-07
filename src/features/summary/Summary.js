import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchSummary, removeSummary } from "./actions";

class Summary extends Component {
  handleClick = () => {
    this.props.fetchSummary(this.props.id);
  };

  render() {
    const { loading, summary, removeSummary, id } = this.props;
    return (
      <>
        {loading.isLoading && loading.id.includes(id) ? (
          <p className="btn text-muted m-2">
            <FontAwesomeIcon icon="spinner" pulse />
          </p>
        ) : (
          [
            !summary.hasOwnProperty("data") || summary.id !== id ? (
              <p
                key="view"
                onClick={this.handleClick}
                className="btn text-muted m-2"
              >
                <FontAwesomeIcon icon="book-reader" />
              </p>
            ) : (
              <p
                key="remove"
                onClick={removeSummary}
                className="btn text-muted m-2"
              >
                <FontAwesomeIcon icon="window-close" />
              </p>
            ),
          ]
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    summary: state.summary,
    loading: state.loading,
  };
}

export default connect(mapStateToProps, { fetchSummary, removeSummary })(
  Summary
);
