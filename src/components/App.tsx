import React from "react";
import "../styles/main.scss";
import WelcomeBanner from "./WelcomeBanner";
import TodoContainer from "./TodoContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div data-testid="app-container">
      <WelcomeBanner />
      <DndProvider backend={HTML5Backend}>
        <TodoContainer />
      </DndProvider>
    </div>
  );
}

export default App;
