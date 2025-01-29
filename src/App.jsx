import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState({});
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");

  const addTodo = () => {
    if (input.trim() && date) {
      setTodos({
        ...todos,
        [date]: [...(todos[date] || []), { text: input, completed: false }],
      });
      setInput("");
      setDate("");
    }
  };

  const toggleTodo = (date, index) => {
    setTodos({
      ...todos,
      [date]: todos[date].map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  };

  const removeTodo = (date, index) => {
    const newTodos = todos[date].filter((_, i) => i !== index);
    if (newTodos.length === 0) {
      const updatedTodos = { ...todos };
      delete updatedTodos[date];
      setTodos(updatedTodos);
    } else {
      setTodos({ ...todos, [date]: newTodos });
    }
  };

  return (
    <div className="app">
      <h2>Date-wise To-Do</h2>
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

      {Object.entries(todos).map(([date, todoList]) => (
        <div key={date} className="todo-section">
          <h3>{date}</h3>
          <ul className="todo-list">
            {todoList.map((todo, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(date, index)}
                />
                <span>{todo.text}</span>
                <button onClick={() => removeTodo(date, index)}>Delete Todo</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
