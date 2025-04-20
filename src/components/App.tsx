import React, { Suspense, lazy } from "react";
import "../styles/main.scss";
import WelcomeBanner from "./WelcomeBanner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box, Skeleton } from "@mui/material";

const TodoContainer = lazy(() => import("./TodoContainer"));

// Skeleton fallback for TodoContainer
const TodoSkeleton = () => (
  <Box className="cb-mx-8 cb-my-10" sx={{ px: 2 }}>
    {Array.from({ length: 3 }).map((_, idx) => (
      <Box className="cb-flex cb-gap-10">
        <Skeleton
          key={idx + "c1"}
          variant="rectangular"
          animation="wave"
          className="cb-w-[70%]"
          height={60}
          sx={{ borderRadius: 2, mb: 2 }}
        />
        <Skeleton
          key={idx + "c2"}
          variant="rectangular"
          animation="wave"
          className="cb-w-[25%]"
          height={60}
          sx={{ borderRadius: 2, mb: 2 }}
        />
      </Box>
    ))}
  </Box>
);

function App() {
  return (
    <div data-testid="app-container">
      <WelcomeBanner />
      <DndProvider backend={HTML5Backend}>
        <Suspense fallback={<TodoSkeleton />}>
          <TodoContainer />
        </Suspense>
      </DndProvider>
    </div>
  );
}

export default App;
