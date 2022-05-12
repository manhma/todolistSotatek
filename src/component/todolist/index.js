import React, { useState } from "react";
import Todo from "./Todo";

export default function Todolist({ todolist, setTodolist }) {
  //sap xep todolist theo ngay
  todolist.sort((a, b) => {
    if (a.dueDate > b.dueDate) return 1;
    if (a.dueDate < b.dueDate) return -1;
    return 0;
  });
  const [arrIdChecked, setArrIdChecked] = useState([]);
  const handleChecked = (id) => {
    if (arrIdChecked.includes(id)) {
      setArrIdChecked(arrIdChecked.filter((item) => item !== id));
    } else {
      setArrIdChecked((prev) => [...prev, id]);
    }
  };
  const handleRemoveAllChecked = () => {
    const newTodolist = [];
    todolist.map((todo) => {
      if (arrIdChecked.findIndex((item) => item === todo.id) === -1) {
        newTodolist.push(todo);
      }
    });
    const jsonTodo = JSON.stringify(newTodolist);
    localStorage.setItem("todolist", jsonTodo);
    setTodolist(newTodolist);
    setArrIdChecked([]);
  };
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="todolist">
      <div className="wrapperTodoist">
        <h2 className="header">Todolist</h2>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          className="creatInput"
          placeholder="Search ..."
        />
        <div className="todos">
          {searchInput.trim()
            ? todolist.map((todo) => {
                if (todo.title.includes(searchInput)) {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      todolist={todolist}
                      setTodolist={setTodolist}
                      handleChecked={handleChecked}
                    />
                  );
                } else {
                  return;
                }
              })
            : todolist.map((todo) => {
                return (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    todolist={todolist}
                    setTodolist={setTodolist}
                    handleChecked={handleChecked}
                  />
                );
              })}
        </div>
      </div>

      {arrIdChecked.length !== 0 ? (
        <div className="bulkBlock">
          <div style={{ flex: "1" }}>Bulk Action:</div>
          <button className="btn doneBtn bulkBtn">Done</button>
          <button
            className="btn removeBtn bulkBtn"
            onClick={handleRemoveAllChecked}
          >
            Remove
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
