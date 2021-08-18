import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import UserAside from "../features/user/UserAside";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Shallow rendered UserAside", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <UserAside />
      </Provider>
    );
  });
});
