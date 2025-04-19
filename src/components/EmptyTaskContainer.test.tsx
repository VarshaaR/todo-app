import { render, screen } from "@testing-library/react";
import EmptyTaskContainer from "./EmptyTaskContainer";
import { Status } from "../types/todo";

// Mock useEmptyStateContent
jest.mock("../constants/emptyStateContent", () => ({
  useEmptyStateContent: jest.fn(),
}));

// Mock useTranslation
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Just return the key
  }),
}));

import { useEmptyStateContent } from "../constants/emptyStateContent";

describe("EmptyTaskContainer", () => {
  const mockContent = {
    image: "/mock-image.svg",
    title: "Mock Title",
    description: "Mock Description",
  };

  beforeEach(() => {
    (useEmptyStateContent as jest.Mock).mockReturnValue(mockContent);
  });

  it("renders image, title and description", () => {
    render(<EmptyTaskContainer status={Status.Completed} />);

    const image = screen.getByAltText("Empty state") as HTMLImageElement;
    const title = screen.getByText("Mock Title");
    const description = screen.getByText("Mock Description");

    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/mock-image.svg");
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("calls useEmptyStateContent with correct status", () => {
    render(<EmptyTaskContainer status={Status.Pending} />);
    expect(useEmptyStateContent).toHaveBeenCalledWith(Status.Pending);
  });
});
