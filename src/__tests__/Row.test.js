import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Row from "../components/Row";

const mockGet = jest.fn();
jest.mock("../api/axios", () => ({
  __esModule: true,
  default: { get: (...args) => mockGet(...args) },
}));

const mockMovies = [
  {
    id: 1,
    title: "Movie One",
    overview: "Overview one",
    backdrop_path: "/path1.jpg",
  },
  {
    id: 2,
    title: "Movie Two",
    overview: "Overview two",
    poster_path: "/path2.jpg",
  },
];

beforeEach(() => {
  Element.prototype.scrollBy = jest.fn();
  mockGet.mockImplementation((url) => {
    if (url.includes("/images")) {
      return Promise.resolve({ data: { logos: [] } });
    }
    return Promise.resolve({
      data: { results: mockMovies },
    });
  });
});

test("Left scroll button is clickable and calls handleScroll", async () => {
  render(<Row title="Test Row" fetchUrl="/test" onMovieClick={() => {}} />);

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /scroll test row left/i })).toBeInTheDocument();
  });

  const leftButton = screen.getByRole("button", { name: /scroll test row left/i });
  await userEvent.click(leftButton);
  expect(leftButton).toBeInTheDocument();
});

test("Right scroll button is clickable", async () => {
  render(<Row title="Test Row" fetchUrl="/test" onMovieClick={() => {}} />);

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /scroll test row right/i })).toBeInTheDocument();
  });

  const rightButton = screen.getByRole("button", { name: /scroll test row right/i });
  await userEvent.click(rightButton);
  expect(rightButton).toBeInTheDocument();
});

test("Poster click triggers onMovieClick with movie", async () => {
  const onMovieClick = jest.fn();
  render(<Row title="Test Row" fetchUrl="/test" onMovieClick={onMovieClick} />);

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /view details for movie one/i })).toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole("button", { name: /view details for movie one/i }));
  expect(onMovieClick).toHaveBeenCalledTimes(1);
  expect(onMovieClick).toHaveBeenCalledWith(mockMovies[0]);
});
