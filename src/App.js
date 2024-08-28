import logo from './logo.svg';
import './App.css';
//import ToDoTabs from './components/todotabs';
import TaskList from './components/task-list/task-list';
function App() {
  return (
    <div className="wrapper">
      <p className="todotitle">#todo</p>
      <TaskList/>
    </div>
  );
}

export default App;
