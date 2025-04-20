export enum Category {
  Personal = "personal",
  Work = "work",
}

export enum Status {
  All = "all",
  Pending = "pending",
  Completed = "completed",
}

export interface Todo {
  id: number;
  text: string;
  category: Category;
  dueDate: number;
  status: Status.Pending | Status.Completed;
}
