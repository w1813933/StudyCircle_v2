import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const today = new Date();
    const newNotifications = [];

    tasks.forEach(task => {
      const dueDate = new Date(task.dueDate);
      const timeDiff = dueDate.getTime() - today.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (dayDiff < 0) {
        newNotifications.push({
          message: `Task "${task.title}" is overdue!`,
          type: "overdue",
        });
      } else if (dayDiff === 0) {
        newNotifications.push({
          message: `Task "${task.title}" is due today.`,
          type: "due-today",
        });
      } else if (dayDiff <= 2) {
        newNotifications.push({
          message: `Only ${dayDiff} day(s) left for "${task.title}".`,
          type: "warning",
        });
      }
    });

    setNotifications(newNotifications);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{  tasks, setTasks, notes, setNotes, notifications }}>
      {children}
    </TaskContext.Provider>
  );
};