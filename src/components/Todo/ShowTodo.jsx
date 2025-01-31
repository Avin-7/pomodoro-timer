import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import todoService from "../../appwrite/todo";
import todoContext from "../../context/todoContext";
import trashIcon from "../../assets/trashIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import saveIcon from "../../assets/saveIcon.svg";
import tickIcon from "../../assets/tickIcon.svg";
import wrongIcon from "../../assets/wrongIcon.svg";

function ShowTodo({ todo }) {
  const [completed, setCompleted] = useState(todo.completed);
  const [editable, setEditable] = useState(false);
  const [newContent, setNewContent] = useState(todo.content);
  const { todoListModified, setTodoListModified } = useContext(todoContext);

  //Updating todos
  const updateTodo = async () => {
    try {
      await todoService.updateDocument(todo.$id, newContent);
    } catch (error) {
      console.log(error + "::: error in ShowTodo...");
    }
  };

  //Completed status
  const updateStatus = async () => {
    try {
      const res = await todoService.updateDocumentStatus(todo.$id, !completed);
      if (res) {
        setTodoListModified(!todoListModified);
      }
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
    <>
      <div className=" mt-8">
        <div
          className={`rounded-lg p-4 relative text-white w-full  
             ${completed ? " bg-[#0c1821]" : todo.bgColor}
               ${completed ? " opacity-[0.75]" : todo.bgColor} `}
        >
          <div className="p-2 pb-4 h-auto mb-4">
            <textarea
              className={`transition ease-linear bg-transparent resize-none w-full outline-none border-none ${
                completed ? "line-through" : ""
              } ${newContent.length > 50 ? "h-24" : "h-auto"}`}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              disabled={!editable}
            ></textarea>
          </div>
          <div className="">
            <div
              className={`grid grid-cols-4 max-[290px]:grid-cols-3 ${
                completed ? "grid-cols-4" : null
              }`}
            >
              <button
                className={`px-1 py-1 rounded-lg  transition ease-linear col-span-2 max-[290px]:col-span-1 ${
                  completed ? "col-span-3" : null
                }`}
                onClick={handleCompleted}
              >
                {completed ? (
                  <img src={wrongIcon} alt="" className="h-6 w-8" />
                ) : (
                  <img src={tickIcon} alt="" className=" h-6 w-8" />
                )}
              </button>
              {!completed ? (
                editable ? (
                  <button
                    onClick={handleSave}
                    title="save"
                    className="px-1 py-1 rounded-lg transition ease-linear save"
                  >
                    <img src={saveIcon} alt="" className="h-6 w-8 " />
                  </button>
                ) : (
                  <button
                    onClick={handleEdit}
                    title="edit"
                    className=" bg-transparent text-white px-1 py-1 rounded-lg  edit"
                  >
                    <img src={editIcon} alt="" className="h-6 w-8" />
                  </button>
                )
              ) : null}
              <button
                onClick={handleDelete}
                title="delete"
                className={` px-1 py-1 rounded-lg transition ease-linear delete `}
              >
                <img src={trashIcon} alt="" className="h-6 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowTodo;
