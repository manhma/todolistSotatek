import React, { useState } from "react";

export default function Todo({ todo, todolist, setTodolist, handleChecked }) {
  const [showDetail, setShowDetail] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.desciption);
  const [editDate, setEditDate] = useState(todo.dueDate);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const handleUpdate = () => {
    const newTodolist = todolist.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          title: editTitle,
          desciption: editDesc,
          dueDate: editDate,
          priority: editPriority,
        };
      } else {
        return item;
      }
    });
    const jsonTodo = JSON.stringify(newTodolist);
    localStorage.setItem("todolist", jsonTodo);
    setTodolist(newTodolist);
    setShowDetail(false);
  };
  const handleDelete = () => {
    const newTodolist = todolist.filter((item) => item.id !== todo.id);
    const jsonTodo = JSON.stringify(newTodolist);
    localStorage.setItem("todolist", jsonTodo);
    setTodolist(newTodolist);
  };

  return (
    <div className="todo">
      <div className="todoContent">
        <input
          className="checkbox"
          type="checkbox"
          onClick={() => {
            handleChecked(todo.id);
          }}
          // checked={todo.completed}
        />
        <label className="todoLabel">{todo.title}</label>
        <button
          onClick={() => setShowDetail(!showDetail)}
          className="btn todoBtn detailBtn"
        >
          Detail
        </button>
        <button onClick={handleDelete} className="btn todoBtn removeBtn">
          Remove
        </button>
      </div>
      {showDetail ? (
        <div className="todoDetail">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="creatInput"
          />
          <div style={{ marginTop: "30px", fontWeight: "bold" }}>
            Description
          </div>
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="textarea"
          />
          <div className="selectBlock">
            <div className="selectBlockElement">
              <div style={{ fontWeight: "bold" }}>Due Date</div>
              <input
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="selectInput"
                type="date"
              />
            </div>
            <div className="selectBlockElement">
              <div style={{ fontWeight: "bold" }}>Piority</div>
              <select
                className="selectInput"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <button onClick={handleUpdate} className="btn addBtn">
            Update
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
