import React from "react";
import "../styles/main.scss";
import WelcomeBanner from "./WelcomeBanner";
import TodoContainer from "./TodoContainer";

function App() {
  return (
    <div className="cb-p-10" data-testid="app-container">
      <WelcomeBanner />
      <TodoContainer />
    </div>
  );
}

export default App;
