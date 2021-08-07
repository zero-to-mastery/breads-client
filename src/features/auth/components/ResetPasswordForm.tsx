import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { match } from "react-router-dom";
import { History } from "history";
import { ResetParams } from "../../../app/Routes";
import { RootState } from "../../rootReducer";

import { resetPassword } from "../actions";

type ResetPasswordFormProps = PropsFromRedux & {
  heading: string;
  buttonText: string;
  alerts: RootState["alerts"];
  match: match<ResetParams>;
  history: History;
};

interface ResetPasswordFormState {
  password: string;
}

class ResetPasswordForm extends Component<
  ResetPasswordFormProps,
  ResetPasswordFormState
> {
  constructor(props: ResetPasswordFormProps) {
    super(props);
    this.state = {
      password: "",
    };
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      password: e.currentTarget.value,
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password } = this.state;
    const { username, token } = this.props.match.params;

    this.props
      .resetPassword(username, token, password)
      .then(() => {
        if (this.props.alerts.type === "danger") throw new Error();
      })
      .then(() => this.props.history.push("/signin"))
      .catch(() => {
        return;
      });
  };

  render() {
    const { password } = this.state;
    const { heading, buttonText } = this.props;

    return (
      <div className="card-demo">
        <div className="card">
          <form onSubmit={this.handleSubmit}>
            <div className="card__header">
              <h2>{heading}</h2>
            </div>
            <div className="card__body">
              <label htmlFor="password">Password:</label>
              <input
                autoComplete="off"
                className="form-input"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
                value={password}
              />
            </div>
            <div className="card__footer">
              <button
                type="submit"
                className="button button--block button--primary"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const connector = connect(null, { resetPassword });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ResetPasswordForm);
