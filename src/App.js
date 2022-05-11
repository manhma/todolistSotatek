import { useState } from "react";
import "./App.css";
import NewTask from "./component/newTask";
import Todolist from "./component/todolist";

function App() {
  const [todolist, setTodolist] = useState(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todolist"));
    return storageTodos;
  });
  return (
    <div className="App">
      <NewTask todolist={todolist} setTodolist={setTodolist} />
      <Todolist todolist={todolist} setTodolist={setTodolist} />
    </div>
  );
}

export default App;
