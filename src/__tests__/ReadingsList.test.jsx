import React from "react";
import { MemoryRouter, Route } from "react-router";
import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { LocalStorageMock } from "@react-mock/localstorage";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../app/store";
import { GlobalReadingsList } from "../features/globalReadings";

const server = setupServer(
  rest.options("http://localhost:8080/api/readings", (req, res, ctx) => {
    return res(ctx.status(204));
  }),
  rest.options("http://localhost:8080/api/tags", (req, res, ctx) => {
    return res(ctx.status(204));
  }),
  rest.get("http://localhost:8080/api/readings", (req, res, ctx) => {
    const readings = [
      {
        created_at: "2020-03-21T23:42:33.000Z",
        description:
          "One of the best skills you can learn is how to think for your self. Only we've never been taught how to think. Read this to learn how to think better.",
        domain: "fs.blog",
        favorite: 2,
        id: 1,
        reader: {
          id: 2,
          image:
            "https://res.cloudinary.com/breads/image/upload/v1613539680/focaccia_jasnlz.jpg",
          username: "secondUser",
        },
        reading_image:
          "https://149366099.v2.pressablecdn.com/wp-content/uploads/2015/08/William-Deresiewicz-Thinking.png",
        tags: null,
        title: "Learning How to Think: The Skill No One Taught You",
        url: "https://fs.blog/2015/08/how-to-think/",
        word_count: 851,
      },
      {
        created_at: "2020-03-22T18:51:01.000Z",
        description:
          "Read this article to learn how a decision journal (template included) can improve the way you make decisions by giving you a critical feedback loop.",
        domain: "fs.blog",
        favorite: 1,
        id: 2,
        reader: {
          id: 1,
          image:
            "https://res.cloudinary.com/breads/image/upload/v1613539776/naan_mzwzze.jpg",
          username: "firstUser",
        },
        reading_image:
          "https://149366099.v2.pressablecdn.com/wp-content/uploads/2014/02/decision-Journal.png",
        tags: null,
        title:
          "How a Decision Journal Changed the Way I make Decisions (Template Included)",
        url: "https://fs.blog/2014/02/decision-journal/",
        word_count: 1260,
      },
    ];

    return res(
      ctx.status(200),
      ctx.set("Access-Control-Allow-Headers", "Authorization, Content-Type"),
      ctx.set("Access-Control-Max-Age", "1728000"),
      ctx.set("Content-Type", "application/json"),
      ctx.json(readings)
    );
  }),
  rest.get("http://localhost:8080/api/tags", (req, res, ctx) => {
    const tags = [
      {
        count: 1,
        date: "2021-08-12T02:08:37.000Z",
        id: 6,
        reading_id: ["52"],
        tag_name: ":LJKDF",
      },
      {
        count: 1,
        date: "2021-08-10T02:30:04.000Z",
        id: 5,
        reading_id: ["51"],
        tag_name: "test",
      },
    ];

    return res(
      ctx.status(200),
      ctx.set("Access-Control-Allow-Headers", "Authorization, Content-Type"),
      ctx.set("Access-Control-Max-Age", "1728000"),
      ctx.set("Content-Type", "application/json"),
      ctx.json(tags)
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Reading List", () => {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "offsetHeight"
  );
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "offsetWidth"
  );

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 50,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 50,
    });
  });

  afterAll(() => {
    Object.defineProperty(
      HTMLElement.prototype,
      "offsetHeight",
      originalOffsetHeight
    );
    Object.defineProperty(
      HTMLElement.prototype,
      "offsetWidth",
      originalOffsetWidth
    );
  });

  test("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <GlobalReadingsList list="global" />
      </Provider>
    );
  });

  test("renders with reading list", async () => {
    render(
      <LocalStorageMock
        items={{
          jwtToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJmaXJzdFVzZXIiLCJpbWFnZSI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2JyZWFkcy9pbWFnZS91cGxvYWQvdjE2MTM1Mzk3NzYvbmFhbl9tend6emUuanBnIiwiaWF0IjoxNjI4MjE1Mzk2fQ.CFJQjPp0aIfm10qAgFlfdeg_KJ5VCaQO2dnnatz45Yk",
        }}
      >
        <MemoryRouter initialEntries={["/"]}>
          <Provider store={store}>
            <Route
              exact
              path="/"
              render={({ match, history }) => {
                return <GlobalReadingsList list="global" match={match} />;
              }}
            />
          </Provider>
        </MemoryRouter>
      </LocalStorageMock>
    );

    const firstTitleElement = await screen.findByRole("heading", {
      name: /Learning How to/i,
    });
    const firstTitleLinkElement = screen.getByRole("link", {
      name: /Learning How to/i,
    });
    const firstDescriptionElement = screen.getByText(/One of the best skills/i);
    const firstWordCountElement = screen.getByText(/3 min read/i);
    const firstUsernameElement = screen.getByRole("heading", {
      name: /firstUser/i,
    });
    const firstUserImgElement = screen.getByAltText(/firstUser/i);
    const firstUserLinkElement = screen.getByRole("link", {
      name: /firstUser/i,
    });

    const secondTitleElement = screen.getByRole("heading", {
      name: /How a Decision Journal Changed the Way/i,
    });
    const secondTitleLinkElement = screen.getByRole("link", {
      name: /How a Decision Journal Changed the Way/i,
    });
    const secondDescriptionElement = screen.getByText(/Read this article/i);
    const secondWordCountElement = screen.getByText(/4 min read/i);
    const secondUsernameElement = screen.getByRole("heading", {
      name: /secondUser/i,
    });
    const secondUserImgElement = screen.getByAltText(/secondUser/i);
    const secondUserLinkElement = screen.getByRole("link", {
      name: /secondUser/i,
    });

    expect(firstTitleElement).toBeInTheDocument();
    expect(firstTitleLinkElement).toBeInTheDocument();
    expect(firstDescriptionElement).toBeInTheDocument();
    expect(firstWordCountElement).toBeInTheDocument();
    expect(firstUsernameElement).toBeInTheDocument();
    expect(firstUserImgElement).toBeInTheDocument();
    expect(firstUserLinkElement).toBeInTheDocument();

    expect(secondTitleElement).toBeInTheDocument();
    expect(secondTitleLinkElement).toBeInTheDocument();
    expect(secondDescriptionElement).toBeInTheDocument();
    expect(secondWordCountElement).toBeInTheDocument();
    expect(secondUsernameElement).toBeInTheDocument();
    expect(secondUserImgElement).toBeInTheDocument();
    expect(secondUserLinkElement).toBeInTheDocument();
  });
});
