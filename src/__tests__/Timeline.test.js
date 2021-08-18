import React from "react";
import { shallow } from "enzyme";
import Timeline from "../common/Timeline";

it("renders without crashing", () => {
  shallow(<Timeline />);
});
