import { useTranslation } from "react-i18next";
import { Status } from "../types/todo";
import EmptyCompleted from "../assets/illustrations/empty-completed.svg";
import EmptyPending from "../assets/illustrations/empty-pending.svg";
import EmptyTaskList from "../assets/illustrations/empty-taskList.svg";

export interface EmptyStateContent {
  completed: {
    image: string;
    title: string;
    description: string;
  };
  pending: {
    image: string;
    title: string;
    description: string;
  };
  all: {
    image: string;
    title: string;
    description: string;
  };
}

export const useEmptyStateContent = (status: Status) => {
  const { t } = useTranslation();

  const content: EmptyStateContent = {
    [Status.Completed]: {
      image: EmptyCompleted,
      title: t("emptyState.completed.title"),
      description: t("emptyState.completed.description"),
    },
    [Status.Pending]: {
      image: EmptyPending,
      title: t("emptyState.pending.title"),
      description: t("emptyState.pending.description"),
    },
    [Status.All]: {
      image: EmptyTaskList,
      title: t("emptyState.all.title"),
      description: t("emptyState.all.description"),
    },
  };

  return content[status];
};
