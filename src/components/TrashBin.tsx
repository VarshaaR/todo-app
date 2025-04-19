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
import { useTranslation } from "react-i18next";

interface TrashBinProps {
  onConfirmDelete: (id: number) => void;
}

const TrashBin: React.FC<TrashBinProps> = ({ onConfirmDelete }) => {
  const { t } = useTranslation();
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
        ref={dropRef}
        className="cb-absolute cb-bottom-4 cb-right-4 cb-sm:cb-bottom-6 cb-sm:cb-right-6 cb-w-24 cb-h-24 cb-z-40 cb-flex cb-items-center cb-justify-center"
        data-testid="trashbin-container"
      >
        <Tooltip title={t("common.drop.here")} arrow>
          <div
            className={`
              cb-w-16 cb-h-16 cb-rounded-full cb-flex cb-items-center cb-justify-center cb-transition-all cb-duration-300 cb-cursor-pointer
              ${isActive ? "cb-bg-red-400" : "cb-bg-blue-400"}
              ${isDragging ? "cb-animate-shake" : ""}
            `}
          >
            <DeleteIcon style={{ color: "white", fontSize: "32px" }} />
          </div>
        </Tooltip>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCancel}
        data-testid="delete-confirm-model"
      >
        <DialogTitle>{t("bin.confirm.model.title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("bin.confirm.model.desc")}</DialogContentText>
        </DialogContent>
        <DialogActions data-testid="delete-confirm-actions">
          <Button onClick={handleCancel} color="primary">
            {t("common.cancel")}
          </Button>
          <Button onClick={handleConfirm} color="error" autoFocus>
            {t("common.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TrashBin;
