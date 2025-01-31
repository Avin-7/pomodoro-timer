import React, { useContext, useEffect } from "react";
import AddTodo from "./AddTodo";
import todoService from "../../appwrite/todo";
import todoContext from "../../context/todoContext";
import ShowTodo from "./ShowTodo";
import userContext from "../../context/userContext";
import { Link } from "react-router-dom";
function Todo() {
  const { loginStatus, userEmail } = useContext(userContext);
  const { todoListModified, setTodoListModified, todos, setTodos } =
    useContext(todoContext);

  const getTodos = async () => {
    try {
      if (userEmail) {
        const data = await todoService.getData({ userEmail });
        if (data) {
          setTodos(data.documents);
        }
      }
    } catch (error) {
      console.log(error + "::: ERROR IN GET_TODOS :: SHOW_TODO...");
    }
  };

  useEffect(() => {
    getTodos();
  }, [todoListModified, setTodoListModified, userEmail]);

  return loginStatus ? (
    <>
      <div className="bg-neutral-950 pt-40 px-9 font-poppins ">
        <AddTodo />
        <div className=" grid gap-4 grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {todos.length != 0 ? (
            todos.map((todo) => {
              return (
                <div key={todo.$id}>
                  <ShowTodo todo={todo} />
                </div>
              );
            })
          ) : (
            <div className="absolute left-[45%] max-lg:left-[40%] max-md:left-[33%] max-sm:left-[25%] top-2/4 text-white text-center">
              No results to show
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className=" flex flex-col justify-center items-center mt-60 text-white text-xl">
      <h1 className=" text-balance mx-20">
        Please
        <Link
          to="/login"
          className=" text-blue-500 underline underline-offset-2 rounded-md  mx-2 hover:text-blue-400"
        >
          Login
        </Link>
        or{" "}
        <Link
          to="/signup"
          className=" text-blue-500 underline underline-offset-2 rounded-md mx-2 hover:text-blue-400"
        >
          Create a new account
        </Link>{" "}
        to view Todo list
      </h1>
    </div>
  );
}

export default Todo;
