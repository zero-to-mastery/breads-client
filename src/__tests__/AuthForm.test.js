import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AuthForm from "../features/auth/components/AuthForm";

const mockStore = configureMockStore();
const store = mockStore({});

describe("shallow rendered Authform", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <AuthForm />
      </Provider>
    );
  });
});
