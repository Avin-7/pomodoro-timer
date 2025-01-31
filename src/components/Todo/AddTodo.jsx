import React, { useState } from "react";
import { useContext } from "react";
import todoContext from "../../context/todoContext";
import userContext from "../../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import todoService from "../../appwrite/todo";
function AddTodo() {
  const [todoContent, setTodoContent] = useState("");
  const { userData } = useContext(userContext);
  const { setTodoListModified, todoListModified } = useContext(todoContext);
  // const [todoLength, setTodoLength] = useState(0);
  const colors = ["bg-[#003652]", "bg-[#35007a]", "bg-[#101935]"];
  const getRandomColor = () => {
    const pos = Math.floor(Math.random() * colors.length);
    const randomColor = colors[pos];
    return randomColor;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoContent == "" || todoContent.length == 0) {
      return null;
    }
    const bgColor = getRandomColor();
    addTodo(todoContent, false, userData.email, bgColor);
    setTodoContent("");
  };
  const notify = () => {
    toast.success("Todo added successfully !!", {
      autoClose: 2000,
    });
  };
  const addTodo = async (content, completed, email, bgColor) => {
    try {
      const res = await todoService.storeData({
        content,
        completed,
        email,
        bgColor,
      });
      if (res) {
        notify();
        setTodoListModified(!todoListModified);
      }
    } catch (error) {
      console.log(error + "::: error in addTodo");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="text-white flex justify-center align-middle ">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 w-100 max-lg:w-3/6 max-md:w-11/12 relative"
        >
          <div className="w-11/12">
            {/* 2xl determines the screen size above laptop large, it is easy to style using min width rather than max width... */}
            <div className=" w-full min-w-[160px] 2xl:min-w-[350px] sm:min-w-[40px]">
              {todoContent.length < 40 ? (
                <input
                  type="text"
                  placeholder="Enter Todo"
                  className=" w-full text-white outline-none border 2xl:h-40 2xl:text-2xl border-neutral-200 bg-neutral-950 rounded-lg px-2 py-2"
                  value={todoContent}
                  // maxLength={80}
                  onChange={(e) => {
                    setTodoContent(e.target.value);
                    // setTodoLength(todoContent.length);
                  }}
                />
              ) : (
                <textarea
                  className=" text-white resize-none outline-none border 2xl:h-40 2xl:text-2xl border-neutral-200 bg-neutral-950 rounded-lg w-full min-h-24 px-2 py-2"
                  placeholder="Enter Todo"
                  value={todoContent}
                  onChange={(e) => {
                    setTodoContent(e.target.value);
                  }}
                ></textarea>
              )}
            </div>
          </div>
          <div>
            <button type="submit" className="h-8 w-8 mt-1 absolute add">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="style=fill">
                    {" "}
                    <g id="add-circle">
                      {" "}
                      <path
                        id="Subtract"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 7.00738C12.4142 7.00739 12.75 7.34317 12.75 7.75739L12.75 11.25L16.25 11.25C16.6642 11.25 17 11.5858 17 12C17 12.4142 16.6642 12.75 16.25 12.75L12.75 12.75L12.75 16.2426C12.75 16.6568 12.4142 16.9926 12 16.9926C11.5857 16.9926 11.25 16.6568 11.25 16.2426L11.25 12.75L7.76476 12.75C7.35055 12.75 7.01476 12.4142 7.01476 12C7.01477 11.5857 7.35055 11.25 7.76477 11.25L11.25 11.25L11.25 7.75738C11.25 7.34317 11.5858 7.00738 12 7.00738Z"
                        fill="#ffffff"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTodo;
