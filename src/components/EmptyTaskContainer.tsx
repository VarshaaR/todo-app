import { useEmptyStateContent } from "../constants/emptyStateContent";
import { Status } from "../types/todo";

const EmptyTaskContainer: React.FC<{ status: Status }> = ({ status }) => {
  const { image, title, description } = useEmptyStateContent(status);

  return (
    <div className="cb-flex cb-flex-col cb-items-center cb-text-center cb-p-1">
      <img src={image} alt="Empty state" className="cb-w-80 cb-mb-2" />
      <h2 className="cb-text-xl cb-font-bold cb-text-gray-800 cb-mb-2">
        {title}
      </h2>
      <p className="cb-text-gray-600 cb-text-sm">{description}</p>
    </div>
  );
};

export default EmptyTaskContainer;
