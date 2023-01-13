import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get("http://mic-d-loadb-1enycy75ctzrh-1557989190.eu-west-3.elb.amazonaws.com/api/todos");
      setTodos(res.data.data);
    };
    console.log(todos);
    fetchTodos()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo) return;
    const res = await axios
      .post("http://mic-d-loadb-1enycy75ctzrh-1557989190.eu-west-3.elb.amazonaws.com/api/todos", {
        data: {
          task: newTodo,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      window.location.reload();

  };

  const handleDelete = async (id) => {
    await axios.delete(`http://mic-d-loadb-1enycy75ctzrh-1557989190.eu-west-3.elb.amazonaws.com/api/todos/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.attributes.task}
            <button onClick={() => handleDelete(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
