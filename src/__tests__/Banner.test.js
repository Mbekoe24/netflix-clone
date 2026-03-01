import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Banner from "../components/Banner";

const mockGet = jest.fn();
jest.mock("../api/axios", () => ({
  __esModule: true,
  default: { get: (...args) => mockGet(...args) },
}));

const mockMovie = {
  id: 1,
  title: "Test Movie",
  overview: "A test movie overview",
  backdrop_path: "/test.jpg",
};

beforeEach(() => {
  mockGet.mockResolvedValue({
    data: { results: [mockMovie] },
  });
});

test("Play button click triggers onMovieSelect with movie", async () => {
  const onMovieSelect = jest.fn();
  render(<Banner onMovieSelect={onMovieSelect} />);

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /play test movie/i })).toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole("button", { name: /play test movie/i }));
  expect(onMovieSelect).toHaveBeenCalledTimes(1);
  expect(onMovieSelect).toHaveBeenCalledWith(mockMovie);
});

test("More Info button click triggers onMovieSelect with movie", async () => {
  const onMovieSelect = jest.fn();
  render(<Banner onMovieSelect={onMovieSelect} />);

  await waitFor(() => {
    expect(screen.getByRole("button", { name: /more info about test movie/i })).toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole("button", { name: /more info about test movie/i }));
  expect(onMovieSelect).toHaveBeenCalledTimes(1);
  expect(onMovieSelect).toHaveBeenCalledWith(mockMovie);
});
