import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get('/api/tasks')
      .then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    await axios.post('/api/tasks', { title, description: "Sample" });
    alert('Added');
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul>{tasks.map((t, i) => <li key={i}>{t.title}</li>)}</ul>
    </div>
  );
}

export default App;
