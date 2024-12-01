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
          <div className="flex gap-44 max-xl:gap-14 max-lg:gap-40 max-sm:gap-44 max-[420px]:gap-32 max-[330px]:gap-20 max-[300px]:gap-5 absolute bottom-1">
            <div>
              <button
                className="px-1 py-1 rounded-lg  transition ease-linear"
                onClick={handleCompleted}
              >
                {completed ? (
                  <img src={wrongIcon} alt="" className="h-6 w-8" />
                ) : (
                  <img src={tickIcon} alt="" className=" h-6 w-8" />
                )}
              </button>
            </div>
            <div>
              {!completed ? (
                editable ? (
                  <button
                    onClick={handleSave}
                    title="save"
                    className="px-3 py-2 rounded-lg transition ease-linear save"
                  >
                    <img src={saveIcon} alt="" className="h-6 w-8 " />
                  </button>
                ) : (
                  <button
                    onClick={handleEdit}
                    title="edit"
                    className=" bg-transparent text-white px-3 py-2 rounded-lg  edit"
                  >
                    <img src={editIcon} alt="" className="h-6 w-8" />
                  </button>
                )
              ) : null}
              <button
                onClick={handleDelete}
                title="delete"
                className={` px-3 py-2 rounded-lg transition ease-linear delete ${
                  completed ? "ml-14" : "ml-0"
                }`}
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
