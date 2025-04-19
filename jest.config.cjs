module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/__mocks__/svgMock.ts",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^react-world-flags$": "<rootDir>/__mocks__/react-world-flags.tsx",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-dnd|dnd-core|react-dnd-html5-backend|@react-dnd)/",
  ],
};
