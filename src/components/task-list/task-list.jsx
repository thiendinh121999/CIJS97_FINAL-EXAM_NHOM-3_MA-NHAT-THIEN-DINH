import React from "react";
import { useState } from "react";
import './task-list.css'
import Task from "../task/task";

function TaskList() {
    const [taskName, setTaskName] = useState(''); 
    const [tasks, setTasks] = useState([]); 
    const [selectedTab, setSelectedTab] = useState("all")
  
    const onInputTaskChange = (event) => {
      setTaskName(event.target.value);
      console.log(taskName); 
    }
    
    const addTask = () => {
      const newTask = {
        name: taskName,
        id: tasks.length == 0
            ? 0
            : tasks[tasks.length - 1].id + 1,
        checked: false
      }
      setTasks(prev => {
        return [...prev, newTask]
      });
      setTaskName('');
    }
  
    const deleteTask = (taskId) => {
      setTasks([...tasks.filter(task => task.id != taskId)]);
    }
  
    const updateTask = (newTask) => {
      const task = tasks.find(task => task.id == newTask.id);
      task.name = newTask.name;
      task.checked = newTask.checked;
      setTasks([...tasks]);
    }
    
    const deleteAll = () => {
      setTasks([]);
    };

    
    const filteredTasks = tasks.filter((task) => {
        if (selectedTab === "all") return true;
        if (selectedTab === "active") return !task.checked;
        if (selectedTab === "completed") return task.checked;
      });

    return (
      <div>
      <ul class="nav justify-content-center">
        <li class="nav-item">
           <div class="nav-link" onClick={()=>setSelectedTab("all")}>All</div>
        </li>
        <li class="nav-item">
          <div class="nav-link" onClick={()=>setSelectedTab("active")} >Active</div>
         </li>
        <li class="nav-item">
           <div class="nav-link" onClick={()=>setSelectedTab("completed")}>Completed</div>
        </li>
      </ul>
      <div className="all-tab-wrapper">
        <div>
        <input className="taskinput"
          onChange={onInputTaskChange}
          placeholder="Add something to do"
          onKeyDown={
            (e) => {
              if (e.key === 'Enter') {
                addTask();
              }
            }
          }
          value={taskName}>
        </input>
        <button className="add-btn" onClick={addTask}>Add</button>
        {
          filteredTasks.map(task => {
            return <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}/>
          })
        }
        
        </div>
        <button className="delete-all" onClick={deleteAll}>Remove all</button>
      </div>
      </div>
    )
  }
  
  export default TaskList;