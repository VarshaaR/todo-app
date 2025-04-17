import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { useDragLayer } from "react-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface TrashBinProps {
  onConfirmDelete: (id: number) => void;
}

const TrashBin: React.FC<TrashBinProps> = ({ onConfirmDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: number }) => {
      setTaskToDelete(item.id);
      setOpenDialog(true);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const { isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
  }));

  const dropRef = useRef<HTMLDivElement | null>(null);

  drop(dropRef);

  const handleConfirm = () => {
    if (taskToDelete !== null) {
      onConfirmDelete(taskToDelete);
      setTaskToDelete(null);
    }
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setTaskToDelete(null);
    setOpenDialog(false);
  };

  const isActive = isOver && canDrop;

  return (
    <>
      <div
        ref={dropRef} // Use the created ref
        className="cb-absolute cb-bottom-4 cb-right-4 cb-sm:cb-bottom-6 cb-sm:cb-right-6 cb-w-24 cb-h-24 cb-z-40 cb-flex cb-items-center cb-justify-center"
      >
        <Tooltip title="Drop here to delete" arrow>
          <div
            className={`
              cb-w-16 cb-h-16 cb-rounded-full cb-flex cb-items-center cb-justify-center cb-transition-all cb-duration-300 cb-cursor-pointer
              ${isActive ? "cb-bg-red-600" : "cb-bg-gray-500"}
              ${isDragging ? "cb-animate-shake" : ""}
            `}
          >
            <DeleteIcon style={{ color: "white", fontSize: "32px" }} />
          </div>
        </Tooltip>
      </div>

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TrashBin;
