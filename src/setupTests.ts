import "@testing-library/jest-dom";

// Suppress ReactDOMTestUtils.act deprecation warning globally
const consoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("ReactDOMTestUtils.act is deprecated")
  ) {
    return;
  }
  consoleError(...args);
};
