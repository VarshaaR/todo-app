module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // Enable automatic JSX runtime
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    process.env.NODE_ENV === "production" && [
      "react-remove-properties",
      { properties: ["data-testid"] },
    ],
  ].filter(Boolean),
};
