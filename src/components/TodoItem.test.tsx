import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem, { TodoItemProps } from "./TodoItem";
import { Todo, Status, Category } from "../types/todo";
import dayjs from "dayjs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Mock translations
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockTodo: Todo = {
  id: 1,
  text: "Sample Task",
  status: Status.Pending as Status.Pending,
  category: Category.Work,
  dueDate: dayjs().add(1, "day").unix(),
};

const renderWithDnd = (props: Partial<TodoItemProps> = {}) => {
  const defaultProps: TodoItemProps = {
    task: mockTodo,
    toggleTaskCompletion: jest.fn(),
    deleteTask: jest.fn(),
    ...props,
  };

  return render(
    <DndProvider backend={HTML5Backend}>
      <TodoItem {...defaultProps} />
    </DndProvider>,
  );
};

describe("TodoItem", () => {
  it("renders task content correctly", () => {
    renderWithDnd();

    expect(screen.getByText("Sample Task")).toBeInTheDocument();
    expect(screen.getByTestId("item-task-category")).toHaveTextContent("work");
    expect(screen.getByText(/common.due.date/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls toggleTaskCompletion when checkbox is clicked", () => {
    const toggleMock = jest.fn();
    renderWithDnd({ toggleTaskCompletion: toggleMock });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(toggleMock).toHaveBeenCalledWith(mockTodo.id);
  });

  it("applies completed styles when task is completed", () => {
    const completedTodo = {
      ...mockTodo,
      status: Status.Completed as Status.Completed,
    };
    renderWithDnd({ task: completedTodo });

    const title = screen.getByText("Sample Task");
    expect(title).toHaveClass("cb-line-through");

    const card = screen.getByTestId("item-container").firstChild as HTMLElement;
    expect(card).toHaveClass("cb-opacity-70");
  });

  it("renders drag icon", () => {
    renderWithDnd();
    expect(screen.getByLabelText("drag")).toBeInTheDocument();
  });
});
