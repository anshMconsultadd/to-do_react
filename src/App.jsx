import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");

  const addTodo = () => {
    if (input.trim() && date) {
      setTodos([...todos, { text: input, completed: false, date }]);
      setInput("");
      setDate("");
    }
  };

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h2>Datewise To-Do</h2>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos
        .filter(todo => todo.date) 
        .map((todo, index) => (
          <div key={index} className="todo-section">
            <h3>{todo.date}</h3>
            <ul className="todo-list">
              <li>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(index)}
                />
                <span>{todo.text}</span>
                <button onClick={() => removeTodo(index)}>Delete Todo</button>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
}

export default App;
