import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TrashBin from "./TrashBin";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorageUtils";
import { Todo, Status } from "../types/todo";
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
  const [filter] = useState<Status>(Status.All);

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
      className="cb-flex cb-flex-row cb-md:cb-flex-col cb-gap-4 cb-px-4 cb-py-6"
      data-testid="todo-container"
    >
      <div className="cb-w-[70%] cb-md:w-2/3">
        <TodoList
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </div>
      <div className="cb-w-[30%] cb-md:cb-w-1/3 cb-flex cb-justify-end">
        <TodoForm addTask={addTask} />
      </div>
      <TrashBin onConfirmDelete={deleteTask} />
    </div>
  );
};

export default TodoContainer;
