import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoForm from "./TodoForm";
import { Category, Status } from "../types/todo";
import { toEpoch } from "../utils/dateUtils";
import dayjs from "dayjs";

// Mock translation
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock toEpoch util
jest.mock("../utils/dateUtils", () => ({
  toEpoch: jest.fn((date) => date.unix()),
}));

describe("TodoForm", () => {
  const addTaskMock = jest.fn();

  beforeEach(() => {
    addTaskMock.mockClear();
  });

  it("renders all form fields", () => {
    render(<TodoForm addTask={addTaskMock} />);
    expect(screen.getByText("common.new.task")).toBeInTheDocument();
    expect(screen.getByLabelText(/common.task.name/i)).toBeInTheDocument();
    expect(screen.getByText(/common.due.date/i)).toBeInTheDocument();
    expect(screen.getByText(/common.category/i)).toBeInTheDocument();
    expect(screen.getByTestId("todoform-add-button")).toBeDisabled();
  });

  it("shows validation messages for short and long task names", () => {
    render(<TodoForm addTask={addTaskMock} />);
    const input = screen.getByLabelText(/common.task.name/i);

    fireEvent.change(input, { target: { value: "a" } });
    expect(screen.getByText("error.msg.min.char")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "a".repeat(30) } });
    expect(screen.getByText("error.msg.max.char")).toBeInTheDocument();
  });

  it("calls addTask with valid form submission", async () => {
    const mockDate = dayjs().add(1, "day");
    (toEpoch as jest.Mock).mockReturnValue(mockDate.unix());

    render(<TodoForm addTask={addTaskMock} />);

    fireEvent.change(screen.getByLabelText(/common.task.name/i), {
      target: { value: "Test Task" },
    });

    const datePickerInput = screen.getByLabelText(/common.due.date/i);
    fireEvent.change(datePickerInput, {
      target: { value: mockDate.format("DD/MM/YYYY") },
    });

    fireEvent.click(screen.getByLabelText(/common.personal/i));

    await waitFor(() => {
      expect(screen.getByTestId("todoform-add-button")).not.toBeDisabled();
    });

    fireEvent.click(screen.getByTestId("todoform-add-button"));

    await waitFor(() => {
      expect(addTaskMock).toHaveBeenCalledWith(
        expect.objectContaining({
          text: "Test Task",
          category: Category.Personal,
          dueDate: mockDate.unix(),
          status: Status.Pending,
        }),
      );
    });
  });

  it("does not submit if task name is invalid", () => {
    render(<TodoForm addTask={addTaskMock} />);
    fireEvent.change(screen.getByLabelText(/common.task.name/i), {
      target: { value: "ab" },
    });
    fireEvent.click(screen.getByTestId("todoform-add-button"));
    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
