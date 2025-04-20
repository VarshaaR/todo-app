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
import { useTranslation } from "react-i18next";

const TodoContainer = function () {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.All);
  const { t } = useTranslation();
  const [taskCounts, setTaskCounts] = useState({
    [Status.All]: 0,
    [Status.Completed]: 0,
    [Status.Pending]: 0,
  });

  useEffect(() => {
    const storedTasks = loadFromLocalStorage();
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    saveToLocalStorage(tasks);
    if (tasks.length === 0) {
      setFilter(Status.All);
    }
  }, [tasks]);

  useEffect(() => {
    setTaskCounts({
      [Status.All]: tasks.length,
      [Status.Completed]: tasks.filter(
        (task) => task.status === Status.Completed,
      ).length,
      [Status.Pending]: tasks.filter((task) => task.status === Status.Pending)
        .length,
    });
  }, [tasks, filter]);

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
      className="cb-flex cb-flex-row cb-flex-wrap cb-gap-2 cb-justify-between cb-px-8 cb-py-10"
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
                  <span className="cb-ml-1">({taskCounts[status]})</span>
                </button>
              ))}
              <div className="cb-text-sm cb-ml-auto cb-text-gray-700 cb-pl-4 cb-py-1">
                {t("common.sorted.by")}: {t("common.due.date")}
              </div>
              <div
                className="cb-fixed cb-bottom-4 cb-right-4 z-10"
                data-testid="trashbin-container"
              >
                <TrashBin onConfirmDelete={deleteTask} />
              </div>
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
    </div>
  );
};

export default TodoContainer;
