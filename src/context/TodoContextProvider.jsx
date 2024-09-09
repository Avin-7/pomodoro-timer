import React from "react";
import todoContext from "./todoContext";
import { useState } from "react";
const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todoListModified, setTodoListModified] = useState(false);

  const context = {
    todos,
    setTodos,
    todoListModified,
    setTodoListModified,
  };
  return (
    <todoContext.Provider value={context}>{children}</todoContext.Provider>
  );
};

export default TodoContextProvider;
