import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieDetail from "../components/MovieDetail";

jest.mock("react-youtube", () => {
  return function MockYouTube() {
    return <div data-testid="youtube-player">YouTube</div>;
  };
});

jest.mock("movie-trailer", () => ({
  __esModule: true,
  default: () => Promise.resolve(null),
}));

const mockMovie = {
  id: 1,
  title: "Test Movie",
  overview: "Test overview",
  release_date: "2024-01-15",
  vote_average: 8.5,
  vote_count: 1000,
};

test("Close button click triggers onClose", async () => {
  const onClose = jest.fn();
  render(<MovieDetail movie={mockMovie} onClose={onClose} />);

  const closeButton = screen.getByRole("button", { name: /close details/i });
  await userEvent.click(closeButton);

  expect(onClose).toHaveBeenCalledTimes(1);
});

test("Renders movie title and details", () => {
  render(<MovieDetail movie={mockMovie} onClose={() => {}} />);

  expect(screen.getByText("Test Movie")).toBeInTheDocument();
  expect(screen.getByText(/8\.5/)).toBeInTheDocument();
  expect(screen.getByText(/1000 votes/)).toBeInTheDocument();
});
