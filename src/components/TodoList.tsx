// import React from 'react';
// import TodoItem from './TodoItem';
// import { Todo } from '../types/todo';

// interface TodoListProps {
//   tasks: Todo[];
//   toggleTaskCompletion: (id: number) => void;
//   deleteTask: (id: number) => void;
// }

// const TodoList: React.FC<TodoListProps> = ({ tasks, toggleTaskCompletion, deleteTask }) => {
//   return (
//     <ul>
//       {tasks.map((task) => (
//         <TodoItem
//           key={task.id}
//           task={task}
//           toggleTaskCompletion={toggleTaskCompletion}
//           deleteTask={deleteTask}
//         />
//       ))}
//     </ul>
//   );
// };

// export default TodoList;

// import React from 'react';
// import TodoItem from './TodoItem';
// import { Todo, Category } from '../types/todo';
// import dayjs from 'dayjs';

// interface TodoListProps {
//   tasks: Todo[];
//   toggleTaskCompletion: (id: number) => void;
//   deleteTask: (id: number) => void;
// }

// const TodoList: React.FC<TodoListProps> = ({
//   tasks,
//   toggleTaskCompletion,
//   deleteTask,
// }) => {
//   const isDueToday = (dueDate: number) =>
//     dayjs(dueDate).isSame(dayjs(), 'day');

//   const sortByDueDate = (taskList: Todo[]) =>
//     [...taskList].sort((a, b) => a.dueDate - b.dueDate);

//   const renderSection = (category: Category) => {
//     const filtered = sortByDueDate(tasks.filter((task) => task.category === category));

//     return (
//       <>
//         {filtered.length > 0 && (
//           <>
//             <h2 className="text-xl font-semibold mb-2 mt-4">
//               {category === Category.Work ? 'Work' : 'Personal'}
//             </h2>
//             <ul>
//               {filtered.map((task) => (
//                 <li
//                   key={task.id}
//                   className={isDueToday(task.dueDate) ? 'border-l-4 border-yellow-500' : ''}
//                 >
//                   <TodoItem
//                     task={task}
//                     toggleTaskCompletion={toggleTaskCompletion}
//                     deleteTask={deleteTask}
//                   />
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </>
//     );
//   };

//   return (
//     <div>
//       {renderSection(Category.Work)}
//       {renderSection(Category.Personal)}
//     </div>
//   );
// };

// export default TodoList;

import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";
import dayjs from "dayjs";

interface TodoListProps {
  tasks: Todo[];
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  toggleTaskCompletion,
  deleteTask,
}) => {
  const isDueToday = (dueDate: number) => dayjs(dueDate).isSame(dayjs(), "day");

  const sortByDueDate = (taskList: Todo[]) =>
    [...taskList].sort((a, b) => a.dueDate - b.dueDate);

  return (
    <div>
      <ul>
        {sortByDueDate(tasks).map((task) => (
          <li
            key={task.id}
            className={
              isDueToday(task.dueDate) ? "border-l-4 border-yellow-500" : ""
            }
          >
            <TodoItem
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
