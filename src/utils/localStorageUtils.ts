import { Todo } from "../types/todo";

const LOCAL_STORAGE_KEY = "todos";

export const loadFromLocalStorage = (): Todo[] => {
  const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export const saveToLocalStorage = (tasks: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};
