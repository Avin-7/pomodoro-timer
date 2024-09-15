import React, { useContext, useState } from "react";
import todoService from "../../appwrite/todo";
import todoContext from "../../context/todoContext";
import trashIcon from "../../assets/trashIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import saveIcon from "../../assets/saveIcon.svg";

function ShowTodo({ todo }) {
  const [completed, setCompleted] = useState(todo.completed);
  const [editable, setEditable] = useState(false);
  const [newContent, setNewContent] = useState(todo.content);
  const { todoListModified, setTodoListModified } = useContext(todoContext);

  //Updating todos
  const updateTodo = async () => {
    try {
      const res = await todoService.updateDocument(todo.$id, newContent);
      console.log(res + "todo updated sucessfully !!!!!");
    } catch (error) {
      console.log(error + "::: error in ShowTodo...");
    }
  };

  //Completed status
  const updateStatus = async () => {
    try {
      const res = await todoService.updateDocumentStatus(todo.$id, !completed);
      console.log(res + "completed");
    } catch (error) {
      console.log(error + "::: error in ShowTodo...");
    }
  };

  //Delete a Todo
  const deleteTodo = async () => {
    try {
      await todoService.deleteDocument(todo.$id);
    } catch (error) {
      console.log(error + "ERROR :::SHOW_TODO :: DELETE_TODO");
    }
  };

  //utility functions

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
        className={`flex border rounded-lg  w-11/12 px-3 2xl:justify-evenly 2xl:w-4/5 duration-300 ${
          completed ? " bg-blue-950" : " bg-neutral-800"
        } ${completed ? "text-white" : "text-white"} max-md:block`}
      >
        <div className=" flex justify-evenly pt-2">
          <div>
            <input
              type="checkbox"
              className="cursor-pointer mt-4 mr-2 2xl:w-6 2xl:h-6 "
              checked={completed}
              onChange={handleCompleted}
            />
          </div>
          <div>
            <textarea
              className={`bg-transparent resize-none py-2 w-128  2xl:text-3xl  max-xl:w-120 max-lg:w-100 max-md:w-80 max-sm:w-48 h-24 max-md:h-32 text-lg outline-none break-words ${
                completed ? "line-through" : ""
              }`}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              disabled={!editable}
            ></textarea>
          </div>
        </div>
        <div className=" flex max-md:justify-end ">
          {!completed ? (
            editable ? (
              <button
                onClick={handleSave}
                title="save"
                className="px-3 py-2 rounded-lg save"
              >
                <img src={saveIcon} alt="" className="h-6 w-8 max-md:w-6 " />
              </button>
            ) : (
              <button
                onClick={handleEdit}
                title="edit"
                className=" bg-transparent text-white px-3 py-2 rounded-lg  edit"
              >
                <img src={editIcon} alt="" className="h-6 w-8 max-md:w-6 " />
              </button>
            )
          ) : null}
          <button
            onClick={handleDelete}
            title="delete"
            className=" px-3 py-2 rounded-lg  delete"
          >
            <img src={trashIcon} alt="" className="h-6 w-8 max-md:w-6 " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowTodo;
