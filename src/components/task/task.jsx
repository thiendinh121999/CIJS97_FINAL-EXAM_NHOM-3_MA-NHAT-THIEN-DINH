import './task.css';

import { useState } from 'react';

function Task(props) {
  const [editMode, setEditMode] = useState(false);
  const [taskName, setTaskName] = useState(props.task?.name);

  const changeEditMode = () => {
    setEditMode(true);
  }

  const onInputTaskChange = (event) => {
    setTaskName(event.target.value);
  }

  const updateTask = () => {
    const task = {...props.task, name: taskName};
    props.updateTask(task);
    setEditMode(false);
  }

  const updateTaskStatus = (event) => {
    const task = {...props.task, checked: event.target.checked};
    props.updateTask(task);
  }

  const crossTask = {
    textDecoration: props.task.checked ? 'line-through' : 'none',
  }

  console.log(props.task.checked);

  return (
    <div className="task">
      <input
        className="check-box"
        onChange={updateTaskStatus}
        defaultChecked={props.task.checked}
        type="checkbox" />
      {
        editMode ?
        <>
          <input onChange={onInputTaskChange} className="task-name" placeholder="Edit your task" value={taskName}></input>
          <button className="save-btn" onClick={updateTask}>Save</button>
        </>
        : <span onClick={changeEditMode} className="task-name" style={crossTask}>{taskName}</span>
      }
      <button className="remove-btn" onClick={() => props.deleteTask(props.task.id)}>Remove</button>
    </div>
  )
}

export default Task;