import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the components used in App to isolate the tests
jest.mock("./WelcomeBanner", () => () => <div data-testid="welcome-banner" />);
jest.mock("./TodoContainer", () => () => <div data-testid="todo-container" />);

describe("App Component", () => {
  it("renders the app without crashing", () => {
    render(<App />);

    // Check that the app container is in the document
    const appContainer = screen.getByTestId("app-container");
    expect(appContainer).toBeInTheDocument();
  });

  it("renders the WelcomeBanner component", () => {
    render(<App />);

    // Check that the WelcomeBanner component is rendered
    const welcomeBanner = screen.getByTestId("welcome-banner");
    expect(welcomeBanner).toBeInTheDocument();
  });

  it("renders the TodoContainer component", () => {
    render(<App />);

    // Check that the TodoContainer component is rendered
    const todoContainer = screen.getByTestId("todo-container");
    expect(todoContainer).toBeInTheDocument();
  });
});
