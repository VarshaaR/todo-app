import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
import { Todo, Status, Category } from "../types/todo";
import { TodoItemProps } from "./TodoItem";

// Mock TodoItem to isolate the test
jest.mock(
  "./TodoItem",
  () =>
    ({ task, toggleTaskCompletion, deleteTask }: TodoItemProps) => (
      <div data-testid={`todo-item-mock-${task.id}`}>
        <span>{task.text}</span>
        <button
          onClick={() => toggleTaskCompletion(task.id)}
          data-testid={`item-mock-toggle-${task.id}`}
        >
          Toggle
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          data-testid={`item-mock-delete-${task.id}`}
        >
          Delete
        </button>
      </div>
    ),
);

const mockTasks: Todo[] = [
  {
    id: 1,
    text: "Task 1",
    category: Category.Work,
    dueDate: new Date().setHours(0, 0, 0, 0), // due today
    status: Status.Pending,
  },
  {
    id: 2,
    text: "Task 2",
    category: Category.Personal,
    dueDate: new Date("2025-04-22").getTime(),
    status: Status.Completed,
  },
];

describe("TodoList", () => {
  it("renders the list container", () => {
    render(
      <TodoList
        tasks={mockTasks}
        toggleTaskCompletion={jest.fn()}
        deleteTask={jest.fn()}
      />,
    );
    expect(screen.getByTestId("list-container")).toBeInTheDocument();
  });

  it("renders all tasks sorted by due date", () => {
    render(
      <TodoList
        tasks={mockTasks}
        toggleTaskCompletion={jest.fn()}
        deleteTask={jest.fn()}
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    expect(screen.getByTestId("todo-item-mock-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-item-mock-2")).toBeInTheDocument();
  });

  it("highlights tasks due today", () => {
    const { container } = render(
      <TodoList
        tasks={mockTasks}
        toggleTaskCompletion={jest.fn()}
        deleteTask={jest.fn()}
      />,
    );

    const highlightedItems = container.querySelectorAll(".cb-border-l-4");
    expect(highlightedItems).toHaveLength(1); // Only 1 task due today
  });

  it("calls toggleTaskCompletion when toggle button is clicked", () => {
    const toggleMock = jest.fn();
    render(
      <TodoList
        tasks={mockTasks}
        toggleTaskCompletion={toggleMock}
        deleteTask={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByTestId("item-mock-toggle-1"));
    expect(toggleMock).toHaveBeenCalledWith(1);
  });

  it("calls deleteTask when delete button is clicked", () => {
    const deleteMock = jest.fn();
    render(
      <TodoList
        tasks={mockTasks}
        toggleTaskCompletion={jest.fn()}
        deleteTask={deleteMock}
      />,
    );

    fireEvent.click(screen.getByTestId("item-mock-delete-1"));
    expect(deleteMock).toHaveBeenCalledWith(1);
  });
});
