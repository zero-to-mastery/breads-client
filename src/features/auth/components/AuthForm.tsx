import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { authUser } from "../actions";
import { History } from "history";
import { RootState } from "../../rootReducer";

type AuthFormProps = PropsFromRedux & {
  heading: any;
  buttonText: any;
  signup: any;
  alerts: RootState["alerts"];
  history: History;
};

interface AuthFormState {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  [k: string]: string | null;
}

class AuthForm extends Component<AuthFormProps, AuthFormState> {
  constructor(props: AuthFormProps) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
    };
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const authType = this.props.signup ? "signup" : "signin";
    let formData: FormData | AuthFormState;
    if (authType === "signup") {
      formData = new FormData();
      formData.append("first_name", this.state.first_name);
      formData.append("last_name", this.state.last_name);
      formData.append("email", this.state.email);
      formData.append("username", this.state.username);
      formData.append("password", this.state.password);
    } else {
      formData = this.state;
    }

    this.props
      .authUser(authType, formData)
      .then(() => {
        if (this.props.alerts.message) throw new Error();
      })
      .then(() => this.props.history.push("/"))
      .catch(() => {
        return;
      });
  };

  render() {
    const { first_name, last_name, email, username, password } = this.state;
    const { heading, buttonText, signup } = this.props;

    return (
      <div className="card-demo">
        <div className="card">
          <form onSubmit={this.handleSubmit}>
            <div className="card__header">
              <h2>{heading}</h2>
            </div>
            <div className="card__body">
              {signup && (
                <>
                  <label htmlFor="first_name" className="margin-top--md">
                    First Name:{" "}
                  </label>
                  <input
                    autoComplete="off"
                    className="form-input"
                    id="first_name"
                    name="first_name"
                    onChange={this.handleChange}
                    type="text"
                    value={first_name}
                    required
                  />
                  <label htmlFor="last_name" className="margin-top--md">
                    Last Name:{" "}
                  </label>
                  <input
                    autoComplete="off"
                    className="form-input"
                    id="last_name"
                    name="last_name"
                    onChange={this.handleChange}
                    type="text"
                    value={last_name}
                    required
                  />
                  <label htmlFor="email" className="margin-top--md">
                    E-mail:{" "}
                  </label>
                  <input
                    autoComplete="off"
                    className="form-input"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                    type="text"
                    value={email}
                    required
                  />
                </>
              )}
              <label htmlFor="username" className="margin-top--md">
                Username:{" "}
              </label>
              <input
                autoComplete="off"
                className="form-input"
                id="username"
                name="username"
                onChange={this.handleChange}
                type="text"
                value={username}
                required
              />
              <label htmlFor="password" className="margin-top--md">
                Password:{" "}
              </label>
              <input
                autoComplete="off"
                className="form-input"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
                value={password}
                required
              />
            </div>
            <div className="card__footer">
              <button
                type="submit"
                className="button button--block button--primary margin-top--md"
              >
                {buttonText}
              </button>
              {!signup && (
                <Link
                  to="/reset"
                  className="button button--sm button--block button--outline button--warning margin-top--md"
                >
                  Forgot Password?
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const connector = connect(null, { authUser });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AuthForm);
