import { loadFromLocalStorage, saveToLocalStorage } from "./localStorageUtils";
import { Todo, Category, Status } from "../types/todo";

describe("LocalStorage Utilities", () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      text: "Buy groceries",
      category: Category.Personal,
      dueDate: Date.now(),
      status: Status.Pending,
    },
  ];

  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: jest.fn((key: string) => store[key] || null),
      setItem: jest.fn((key: string, value: string) => {
        store[key] = value;
      }),
      clear: jest.fn(() => {
        store = {};
      }),
    };
  })();

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("saveToLocalStorage", () => {
    it("should save tasks to localStorage", () => {
      saveToLocalStorage(mockTodos);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "todos",
        JSON.stringify(mockTodos),
      );
    });
  });

  describe("loadFromLocalStorage", () => {
    it("should return parsed tasks from localStorage", () => {
      localStorage.setItem("todos", JSON.stringify(mockTodos));
      const loaded = loadFromLocalStorage();
      expect(loaded).toEqual(mockTodos);
    });

    it("should return an empty array if localStorage is empty", () => {
      const loaded = loadFromLocalStorage();
      expect(loaded).toEqual([]);
    });
  });
});
