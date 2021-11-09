import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import App from "../app/App";

describe("App", () => {
  test("renders without crashing", () => {
    shallow(<App />);
  });

  test("renders with reading list", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const signupElement = screen.getAllByRole("link", { name: /sign/i });
    const loginElement = screen.getAllByRole("link", { name: /log/i });
    const imgElement = screen.getByRole("img", { name: /up-arrow/i });
    const headingElement = screen.getByRole("heading", { name: /global/i });
    const newTagsElement = screen.getByRole("tab", { name: /New/i });
    const topTagsElement = screen.getByRole("tab", { name: /Top/i });
    const searchElement = screen.getByRole("textbox");
    const readingsTextElement = screen.getByText(/readings:/i);
    const websitesReadTextElement = screen.getByText(/websites/i);
    const mostReadTextElement = screen.getByText(/most/i);
    const loavesTextElement = screen.getByText(/loaves:/i);

    // navbar
    expect(searchElement).toBeInTheDocument();
    expect(signupElement[0]).toBeInTheDocument();
    expect(loginElement[0]).toBeInTheDocument();

    // signup aside
    expect(imgElement).toBeInTheDocument();

    // reading stats aside
    expect(headingElement).toBeInTheDocument();
    expect(readingsTextElement).toBeInTheDocument();
    expect(websitesReadTextElement).toBeInTheDocument();
    expect(mostReadTextElement).toBeInTheDocument();
    expect(loavesTextElement).toBeInTheDocument();
    expect(newTagsElement).toBeInTheDocument();
    expect(topTagsElement).toBeInTheDocument();
  });
});
