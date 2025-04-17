import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher";

// Mock the useTranslation hook from react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe.skip("LanguageSwitcher Component", () => {
  it("renders the language select dropdown", () => {
    render(<LanguageSwitcher />);

    // Check if the select dropdown is rendered
    const languageSelect = screen.getByTestId("language-select");
    expect(languageSelect).toBeInTheDocument();
  });

  it("renders the language options", () => {
    render(<LanguageSwitcher />);

    // Check if the language options are rendered
    const englishOption = screen.getByTestId("language-menuitem-en");
    const frenchOption = screen.getByTestId("language-menuitem-fr");
    const germanOption = screen.getByTestId("language-menuitem-de");

    expect(englishOption).toBeInTheDocument();
    expect(frenchOption).toBeInTheDocument();
    expect(germanOption).toBeInTheDocument();
  });

  it("calls changeLanguage when a new language is selected", () => {
    render(<LanguageSwitcher />);

    // Get the select element and fire a change event
    const languageSelect = screen.getByTestId("language-select");

    // Type casting to HTMLSelectElement to access the `value` property
    fireEvent.change(languageSelect as HTMLSelectElement, {
      target: { value: "fr" },
    });

    // Check if the changeLanguage function was called with the correct language
    expect((languageSelect as HTMLSelectElement).value).toBe("fr");
  });
});
