import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Chip,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Todo, Status, Category } from "../types/todo";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface TodoItemProps {
  task: Todo;
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, toggleTaskCompletion }) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        drag(node);
        preview(node);
      }}
    >
      <Card
        variant="outlined"
        ref={cardRef}
        className={`cb-mb-4 ${
          task.status === Status.Completed
            ? "cb-bg-gray-100 cb-opacity-70"
            : "cb-bg-white"
        }`}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <CardContent className="cb-flex cb-items-center cb-gap-2 cb-w-full">
          <div className="cb-flex cb-items-center cb-gap-2 cb-w-4/5">
            <Checkbox
              checked={task.status === Status.Completed}
              onChange={() => toggleTaskCompletion(task.id)}
              color="primary"
            />
            <div className="cb-w-full">
              <div className="cb-flex cb-flex-col cb-justify-between cb-items-start cb-w-full">
                <Chip
                  label={task.category}
                  size="small"
                  variant="outlined"
                  color={
                    task.category === Category.Work ? "primary" : "secondary"
                  }
                  sx={{ borderRadius: "16px", marginBottom: "4px" }}
                />
                <Typography
                  variant="h6"
                  className={`cb-first-letter-uppercase ${task.status === Status.Completed ? "cb-line-through" : ""}`}
                >
                  {task.text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("common.due.date")}:{" "}
                  {dayjs(task.dueDate).format("dddd, D MMM YYYY")}
                </Typography>
              </div>
            </div>
          </div>

          <div className="cb-flex cb-items-center cb-justify-end cb-w-1/5">
            <IconButton
              className="cb-cursor-move cb-text-gray-500 hover:cb-text-gray-700"
              aria-label="drag"
            >
              <DragIndicatorIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoItem;
