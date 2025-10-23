import { Link, useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import TaskCard from '../components/TaskCard/TaskCard';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import '../styles/Tasks.css';
import {
  FiPlus,
  FiCalendar,
} from "react-icons/fi";

const tempTasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', status: 'Pending' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', status: 'In Progress' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', status: 'Completed' },
  { id: 4, title: 'Task 4', description: 'Description for Task 4', status: 'Pending' },
  { id: 5, title: 'Task 5', description: 'Description for Task 5', status: 'In Progress' },
  { id: 6, title: 'Task 6', description: 'Description for Task 6', status: 'Completed' },
];

const Tasks = () => {
  const { setAuth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState(tempTasks);
  
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProcessTasks, setInProcessTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    setTodoTasks(tasks.filter(task => task.status.toLowerCase() === 'pending'));
    setInProcessTasks(tasks.filter(task => task.status.toLowerCase() === 'in progress'));
    setCompletedTasks(tasks.filter(task => task.status.toLowerCase() === 'completed'));
  }, [tasks]);

  // useEffect(() => {
  //   const getTasks = async () => {
  //     try {
  //       const response = await axiosPrivate.get('/tasks?limit=5');
  //       setTasks(response.data);
  //     } catch (err) {
  //       if (err.response?.status === 401 || err.response?.status === 403) {
  //         toast.error('Session expired. Please log in again.');
  //         setAuth({});
  //         navigate('/', { state: { from: location }, replace: true });
  //       } else {
  //         console.error(err);
  //       }
  //     }
  //   }

  //   getTasks();
  // }, [axiosPrivate, navigate, location, setAuth]);

  return (
    <div className="board">
      <div className="column">
        <div className='column-header'>
        <h2>To Do</h2>
        <button
          className="add-task-btn"
          // onClick={() =>
          //   setIsAddingTask(
          //     isAddingTask === column.id ? null : column.id
          //   )
          // }
          title="Add new task"
        >
          <FiPlus size={16} />
        </button>
        </div>
        {todoTasks.length > 0 ? todoTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        )) : (
        <div className="empty-state">
          <div className="empty-illustration">
            <div className="empty-icon">📝</div>
            <div className="empty-glow"></div>
          </div>
          <h4>No tasks yet</h4>
          <p>Get started by creating your first task</p>
          <button
            className="add-task-btn outline"
            // onClick={() => setIsAddingTask(column.id)}
          >
            <FiPlus size={16} />
            Add First Task
          </button>
        </div>
        )}
      </div>
      <div className="column">
        <div className='column-header'>
        <h2>In Process</h2>
        </div>
        {inProcessTasks.length > 0 ? inProcessTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        )) : (
        <div className="empty-state">
          <div className="empty-illustration">
            <div className="empty-icon">📝</div>
            <div className="empty-glow"></div>
          </div>
          <h4>No tasks yet</h4>
        </div>
        )}
      </div>

      <div className="column">
        <div className="column-header">
        <h2>Completed</h2>
        </div>
        {completedTasks.length > 0 ? completedTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        )) : (
        <div className="empty-state">
          <div className="empty-illustration">
            <div className="empty-icon">📝</div>
            <div className="empty-glow"></div>
          </div>
          <h4>No tasks yet</h4>
        </div>
        )}
      </div>
    </div>
  )
}
export default Tasks