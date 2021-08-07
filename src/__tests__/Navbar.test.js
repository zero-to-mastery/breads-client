import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Navbar from "../containers/Navbar";

const mockStore = configureMockStore();
const store = mockStore({});

it("renders without crashing", () => {
  shallow(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
});
