import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ListCard from "../common/ListCard";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Shallow rendered ListCard", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <ListCard />
      </Provider>
    );
  });
});
