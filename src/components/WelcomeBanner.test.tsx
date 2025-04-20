import React from "react";
import { render, screen } from "@testing-library/react";
import WelcomeBanner from "./WelcomeBanner";
// import { useTranslation } from "react-i18next";
// import dayjs from "dayjs";

// Mock translation
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        "welcome.title": "Welcome!",
        "welcome.description": "This is your dashboard.",
      })[key] || key,
  }),
}));

// Mock dayjs to return a fixed date
jest.mock("dayjs", () => () => ({
  format: () => "April 19, 2025",
}));

// Mock LanguageSwitcher (assume it has its own tests)
jest.mock("./LanguageSwitcher", () => () => (
  <div data-testid="language-switcher">Mock Language Switcher</div>
));

describe("WelcomeBanner", () => {
  it("renders the current date and welcome messages", () => {
    render(<WelcomeBanner />);

    expect(screen.getByTestId("welcome-container")).toBeInTheDocument();
    expect(screen.getByText("April 19, 2025")).toBeInTheDocument();
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(screen.getByText("This is your dashboard.")).toBeInTheDocument();
    expect(screen.getByTestId("language-switcher")).toBeInTheDocument();
  });
});
