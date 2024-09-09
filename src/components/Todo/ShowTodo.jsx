import React, { useContext, useState } from "react";
import todoService from "../../appwrite/todo";
import todoContext from "../../context/todoContext";

function ShowTodo({ todo }) {
  const [completed, setCompleted] = useState(todo.completed);
  const [editable, setEditable] = useState(false);
  const [newContent, setNewContent] = useState(todo.content);
  const { todoListModified, setTodoListModified } = useContext(todoContext);

  const updateTodo = async () => {
    try {
      const res = await todoService.updateDocument(todo.$id, newContent);
      console.log(res + "todo updated sucessfully !!!!!");
    } catch (error) {
      console.log(error + "::: error in ShowTodo...");
    }
  };

  const updateStatus = async () => {
    try {
      const res = await todoService.updateDocumentStatus(todo.$id, !completed);
      console.log(res + "completed");
    } catch (error) {
      console.log(error + "::: error in ShowTodo...");
    }
  };

  const deleteTodo = async () => {
    try {
      await todoService.deleteDocument(todo.$id);
    } catch (error) {
      console.log(error + "ERROR :::SHOW_TODO :: DELETE_TODO");
    }
  };

  const handleCompleted = () => {
    setCompleted(!completed);
    updateStatus();
  };

  const handleDelete = () => {
    deleteTodo();
    setTodoListModified(!todoListModified);
  };

  const handleEdit = () => {
    setEditable(!editable);
  };

  const handleSave = () => {
    updateTodo();
    setEditable(!editable);
  };
  return (
    <div className=" flex justify-center align-middle my-8 ">
      <div
        className={`flex border rounded-lg w-3/4 px-3 duration-300  ${
          completed ? "bg-[#86F591]" : "bg-transparent"
        } ${completed ? "text-black" : "text-white"} `}
      >
        <div>
          <input
            type="checkbox"
            className="cursor-pointer mt-4 mr-2"
            checked={completed}
            onChange={handleCompleted}
          />
        </div>
        <div>
          <input
            type="text"
            className={`bg-transparent py-2 w-128 text-lg outline-none ${
              completed ? "line-through" : ""
            }`}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            disabled={!editable}
          />
        </div>
        <div className=" pl-14">
          {editable ? (
            <button
              onClick={handleSave}
              title="save"
              className=" text-white px-3 py-2 rounded-lg mx-2 save"
            >
              <ion-icon name="save-sharp"></ion-icon>
            </button>
          ) : (
            <button
              onClick={handleEdit}
              title="edit"
              className=" bg-transparent text-white px-3 py-2 rounded-lg mx-2"
            >
              <ion-icon name="pencil-sharp"></ion-icon>
            </button>
          )}
          <button
            onClick={handleDelete}
            title="delete"
            className=" px-3 py-2 rounded-lg mx-2 delete"
          >
            <ion-icon name="trash-sharp"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowTodo;
