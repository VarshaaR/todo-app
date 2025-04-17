import "@testing-library/jest-dom";

// Suppress ReactDOMTestUtils.act deprecation warning globally
const consoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes(
      "Warning: An update to %s inside a test was not wrapped in act(...)",
    )
  ) {
    return;
  }
  consoleError(...args);
};
