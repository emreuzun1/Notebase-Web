import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { Link } from "react-router-dom";
import { Home } from "../pages/Home/Home";

afterEach(cleanup);

describe("Home Page Tests", () => {
  test("should render all items in the page", () => {
    render(<Home />);

    const title = screen.getByLabelText("Free notes for every students");
    expect(title).toBeInTheDocument();
  });
});
