import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [error, setError] =useState([])

  const [tasks, setTasks] = useState([
  ]);

  useEffect(() => { 
    const getTasks = async () =>{
      try {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    } catch(error) {
      setError(error.message)
    }
    };

    getTasks()
  }, [])


  // fetch Tasks
  const fetchTasks = async () => {
      const res = await fetch ('https://localhost:5000/tasks')
      const data = await res.json()

      return data
    };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('https://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
    })

    const data = await res.json
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`https://localhost:5000/tasks/${id}`,{method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Task To Show"
      )}
      <h3>{error !== "" && error}</h3>
    </div>
  );
}

export default App;
