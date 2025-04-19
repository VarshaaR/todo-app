import { useTranslation } from "react-i18next";
import { Status } from "../types/todo";
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
      image: "/src/assets/EmptyCompleted.svg",
      title: t("emptyState.completed.title"),
      description: t("emptyState.completed.description"),
    },
    [Status.Pending]: {
      image: "/src/assets/EmptyPending.svg",
      title: t("emptyState.pending.title"),
      description: t("emptyState.pending.description"),
    },
    [Status.All]: {
      image: "/src/assets/EmptyTaskList.svg",
      title: t("emptyState.all.title"),
      description: t("emptyState.all.description"),
    },
  };

  return content[status];
};
