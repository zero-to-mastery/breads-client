import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ListItem from "../features/globalReadings/components/ListItem";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Shallow rendered ListItem", () => {
  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <ListItem />
      </Provider>
    );
  });
});
