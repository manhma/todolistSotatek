import React, { useState } from "react";

export default function NewTask({ todolist, setTodolist }) {
  const checkTime = (t) => {
    if (t < 10) {
      t = "0" + t;
    }
    return t;
  };
  const a = new Date();
  const today = `${a.getFullYear()}-${checkTime(a.getMonth() + 1)}-${checkTime(
    a.getDate()
  )}`;
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [dateInput, setDateInput] = useState(today);
  const [priorityInput, setPriorityInput] = useState("normal");

  const handleSubmit = () => {
    setTodolist((prev) => {
      const newTodolist = [
        ...prev,
        {
          id: new Date().getTime(),
          title: titleInput,
          desciption: descInput,
          dueDate: dateInput,
          priority: priorityInput,
          completed: false,
        },
      ];
      const jsonTodo = JSON.stringify(newTodolist);
      localStorage.setItem("todolist", jsonTodo);
      return newTodolist;
    });
    setTitleInput("");
    setDescInput("");
    setDateInput(today);
    setPriorityInput("normal");
  };
  return (
    <div className="newTask">
      <h2 className="header">New Task</h2>
      <input
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        className="creatInput"
        placeholder="Add new task ..."
      />
      <div className="label">Description</div>
      <textarea
        onChange={(e) => setDescInput(e.target.value)}
        className="textarea"
      />
      <div className="selectBlock">
        <div className="selectBlockElement">
          <div className="label">Due Date</div>
          <input
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="selectInput"
            type="date"
          />
        </div>
        <div className="selectBlockElement">
          <div className="label">Priority</div>
          <select
            onChange={(e) => setPriorityInput(e.target.value)}
            className="selectInput"
            defaultValue={"Normal"}
          >
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>
        </div>
      </div>
      <button onClick={handleSubmit} className="btn addBtn">
        Add
      </button>
    </div>
  );
}
