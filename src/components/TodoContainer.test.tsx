/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react";
import TodoContainer from "../components/TodoContainer";
import * as localStorageUtils from "../utils/localStorageUtils";
import "@testing-library/jest-dom";

jest.mock("../components/EmptyTaskContainer", () => ({
  __esModule: true,
  default: ({ status }: any) => (
    <div data-testid="mock-empty-task">{`Empty: ${status}`}</div>
  ),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("TodoContainer", () => {
  beforeEach(() => {
    jest.spyOn(localStorageUtils, "loadFromLocalStorage").mockReturnValue([]);
    jest
      .spyOn(localStorageUtils, "saveToLocalStorage")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with no tasks initially", () => {
    render(<TodoContainer />);
    expect(screen.getByTestId("todo-container")).toBeInTheDocument();
    expect(screen.getByTestId("mock-empty-task")).toBeInTheDocument();
  });
});
