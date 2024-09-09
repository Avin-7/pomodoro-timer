import React, { useState } from "react";
import { useContext } from "react";
import todoContext from "../../context/todoContext";
import userContext from "../../context/userContext";
import todoService from "../../appwrite/todo";
function AddTodo() {
  const [todoContent, setTodoContent] = useState("");
  const { userData } = useContext(userContext);
  const { setTodoListModified, todoListModified } = useContext(todoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoContent == "" || todoContent.length == 0) {
      return null;
    }
    addTodo(todoContent, false, userData.email);
    setTodoContent("");
  };

  const addTodo = async (content, completed, email) => {
    try {
      await todoService.storeData({ content, completed, email });
      setTodoListModified(!todoListModified);
      console.log("executed");
    } catch (error) {
      console.log(error + "::: error in addTodo");
    }
  };

  return (
    <div className="text-white flex justify-center align-middle">
      <form onSubmit={handleSubmit} className="flex gap-5 w-3/6">
        <input
          type="text"
          name="todo"
          id="todo"
          value={todoContent}
          placeholder="Enter Todo..."
          onChange={(e) => setTodoContent(e.target.value)}
          className=" pl-4 w-full py-2 rounded-xl text-white bg-transparent outline-none border border-white"
        />
        <button type="submit" className=" px-6 py-2 bg-[#3595F0] rounded-lg">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
