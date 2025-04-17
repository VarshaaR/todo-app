import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Todo, Status, Category } from "../types/todo";
import { toEpoch } from "../utils/dateUtils";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";

interface TodoFormProps {
  addTask: (newTask: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const { t } = useTranslation();
  const [taskName, setTaskName] = useState("");
  const [dueDateObj, setDueDateObj] = useState<Dayjs | null>(null);
  const [dueDateEpoch, setDueDateEpoch] = useState<number | null>(null);
  const [category, setCategory] = useState(Category.Work);

  const isTaskNameValid = taskName.length >= 3 && taskName.length <= 25;
  const isFormValid = isTaskNameValid && dueDateObj && category;

  const getTaskNameHelperText = (value: string) => {
    if (value.length === 0) return "";
    if (value.length < 3) return "Minimum length is 3 characters";
    if (value.length > 25) return "Maximum length is 25 characters";
    return "";
  };
  const handleDateChange = (newDate: Dayjs | null) => {
    setDueDateObj(newDate);
    setDueDateEpoch(newDate ? toEpoch(newDate) : null); // Convert to epoch
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dueDateEpoch === null || !isFormValid) {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskName,
      category: category,
      dueDate: dueDateEpoch,
      status: Status.Pending as Status.Pending,
    };
    addTask(newTask);
    setTaskName("");
    setDueDateObj(null);
    setDueDateEpoch(null);
    setCategory(Category.Work);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="cb-flex cb-flex-col cb-gap-2 cb-min-w-64"
    >
      {/* Task Name */}
      <FormControl>
        <FormLabel>
          {t("common.task.name")}
          <span className="cb-text-red-500">*</span>
        </FormLabel>
        <TextField
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          error={taskName.length > 0 && !isTaskNameValid}
          helperText={getTaskNameHelperText(taskName)}
          required
        />
      </FormControl>

      {/* Due Date */}
      <FormControl>
        <FormLabel>
          {t("common.due.date")}
          <span className="cb-text-red-500">*</span>
        </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dueDateObj}
            onChange={handleDateChange}
            minDate={dayjs()}
            openTo="day"
            format="DD/MM/YYYY"
          />
        </LocalizationProvider>
      </FormControl>

      {/* Category */}
      <FormControl>
        <FormLabel>{t("common.category")}</FormLabel>
        <RadioGroup
          row
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          <FormControlLabel
            value={Category.Work}
            control={<Radio />}
            label={t("common.work")}
          />
          <FormControlLabel
            value={Category.Personal}
            control={<Radio />}
            label={t("common.personal")}
          />
        </RadioGroup>
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" disabled={!isFormValid}>
        {t("common.add.task")}
      </Button>
    </Box>
  );
};

export default TodoForm;
