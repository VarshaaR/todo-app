import { useTranslation } from "react-i18next";
import { Status } from "../types/todo";

type EmptyStateKey = "completed" | "emptyTask";

export interface EmptyStateContent {
  completed: {
    image: string;
    title: string;
    description: string;
  };
  emptyTask: {
    image: string;
    title: string;
    description: string;
  };
}

export const useEmptyStateContent = (status: Status) => {
  const { t } = useTranslation();

  const mapState: Record<Status, EmptyStateKey> = {
    [Status.All]: "emptyTask",
    [Status.Pending]: "emptyTask",
    [Status.Completed]: "completed",
  };

  const content: EmptyStateContent = {
    completed: {
      image: "/src/assets/EmptyPending.svg",
      title: t("emptyState.completed.title"),
      description: t("emptyState.completed.description"),
    },
    emptyTask: {
      image: "/src/assets/EmptyCompleted.svg",
      title: t("emptyState.all.title"),
      description: t("emptyState.all.description"),
    },
  };

  return content[mapState[status]];
};
