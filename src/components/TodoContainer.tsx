import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TrashBin from "./TrashBin";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorageUtils";
import { Todo, Status } from "../types/todo";
import EmptyTaskContainer from "./EmptyTaskContainer";
// import { Todo, Status, Category } from "../types/todo";

const TodoContainer = function () {
  // const mockTask: Todo[] = [
  //   {
  //     id: 1744974980844,
  //     text: "sample",
  //     category: Category.Work,
  //     dueDate: 1745433000000,
  //     status: Status.Pending,
  //   },
  //   {
  //     id: 1744974997114,
  //     text: "sample new task",
  //     category: Category.Personal,
  //     dueDate: 1745433000000,
  //     status: Status.Pending,
  //   },
  // ];
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.All);

  useEffect(() => {
    const storedTasks = loadFromLocalStorage();
    // const storedTasks = mockTask;

    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    saveToLocalStorage(tasks);
  }, [tasks]);

  const addTask = (newTask: Todo) => {
    setTasks((prev) => [...prev, newTask]);
    console.log(tasks);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === Status.Completed
                  ? Status.Pending
                  : Status.Completed,
            }
          : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === Status.Completed;
    if (filter === "pending") return task.status === Status.Pending;
    return true;
  });

  return (
    <div
      className="cb-flex cb-flex-row cb-flex-wrap cb-px-4 cb-py-6 cb-gap-2 cb-justify-between"
      data-testid="todo-container"
    >
      <div className="cb-w-[70%]" data-testid="todo-list-wrapper">
        {tasks.length === 0 ? (
          <EmptyTaskContainer status={filter} />
        ) : (
          <div data-testid="todo-list-container">
            <div
              className="cb-flex cb-gap-2 cb-mb-4 cb-border-b cb-border-solid cb-pb-4 cb-border-gray-300"
              data-testid="todo-status-container"
            >
              {Object.values(Status).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`cb-px-4 cb-py-1 cb-rounded cb-text-sm cb-font-medium cb-border ${
                    filter === status
                      ? "cb-bg-blue-500 cb-text-white"
                      : "cb-bg-white cb-text-gray-700 cb-border-gray-300 hover:cb-bg-gray-100"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            {filteredTasks.length === 0 ? (
              <EmptyTaskContainer status={filter} />
            ) : (
              <TodoList
                tasks={filteredTasks}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
              />
            )}
          </div>
        )}
      </div>

      <div className="cb-min-w-fit" data-testid="add-list-container">
        <TodoForm addTask={addTask} />
      </div>

      <div
        className="cb-fixed cb-bottom-4 cb-right-4 z-10"
        data-testid="trashbin-container"
      >
        <TrashBin onConfirmDelete={deleteTask} />
      </div>
    </div>
  );
};

export default TodoContainer;
