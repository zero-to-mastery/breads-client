import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../rootReducer";
import { removeAlert } from "./actions";

type AlertProps = PropsFromRedux;

const Alert: React.FunctionComponent<AlertProps> = ({
  alerts,
  removeAlert,
}) => {
  return (
    <div
      className={`alert alert--${alerts.type} margin-bottom--md`}
      role="alert"
    >
      <button
        onClick={removeAlert}
        aria-label="Close"
        className="close"
        type="button"
      >
        <span aria-hidden="true">×</span>
      </button>
      {alerts.message}
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    alerts: state.alerts,
  };
}

const connector = connect(mapStateToProps, { removeAlert });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Alert);
