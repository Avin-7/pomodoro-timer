import React, { useContext, useEffect } from "react";
import AddTodo from "./AddTodo";
import todoService from "../../appwrite/todo";
import todoContext from "../../context/todoContext";
import ShowTodo from "./ShowTodo";
import userContext from "../../context/userContext";
function Todo() {
  const { loginStatus, email } = useContext(userContext);
  const { todoListModified, todos, setTodos } = useContext(todoContext);

  const getTodos = async () => {
    try {
      if (email) {
        const data = await todoService.getData({ email });
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
  }, [todoListModified]);

  return loginStatus ? (
    <>
      <div className="bg-neutral-950 pt-40 px-9 font-poppins">
        <AddTodo />
        <div>
          {todos.length != 0 ? (
            <ul className="text-white bg-neutral-950">
              {todos.map((todo) => {
                return (
                  <li key={todo.$id}>
                    <ShowTodo todo={todo} />
                  </li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  ) : (
    <div className="flex justify-center align-middle pt-40 text-white text-xl">
      Login or signup
    </div>
  );
}

export default Todo;
