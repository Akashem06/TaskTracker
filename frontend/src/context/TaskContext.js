import React, { createContext, useContext, useReducer } from 'react';

export const TaskContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TASKS':
        return action.payload;
      case 'ADD_TASK':
        return [...state, action.payload];
      case 'DELETE_TASK':
        return state.filter(task => task.app_name !== action.payload);
      case 'UPDATE_TASK':
        return state.map(task => (task.app_name === action.payload.app_name ? {...task, app_name: action.payload.new_app_name } : task));
      default:
        return state;
    }
  };
  
const initialTasks = [];

export const TaskContextProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
  
export const useTaskContext = () => useContext(TaskContext);