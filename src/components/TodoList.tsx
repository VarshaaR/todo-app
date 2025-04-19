import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";
import dayjs from "dayjs";

interface TodoListProps {
  tasks: Todo[];
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  toggleTaskCompletion,
  deleteTask,
}) => {
  const isDueToday = (dueDate: number) => dayjs(dueDate).isSame(dayjs(), "day");

  const sortByDueDate = (taskList: Todo[]) =>
    [...taskList].sort((a, b) => a.dueDate - b.dueDate);

  return (
    <div data-testid="list-container">
      <ul>
        {sortByDueDate(tasks).map((task) => (
          <li
            key={task.id}
            data-testid={`todo-item-${task.id}`}
            className={
              isDueToday(task.dueDate)
                ? "cb-border-l-4 cb-border-yellow-500"
                : ""
            }
          >
            <TodoItem
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
