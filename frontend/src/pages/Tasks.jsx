import { Link, useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import TaskCard from '../components/TaskCard/TaskCard';
import AddTask from '../components/AddTask/AddTask';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import '../styles/Tasks.css';
import {
  FiPlus,
  FiCalendar,
} from "react-icons/fi";

const Tasks = () => {
  const { setAuth } = useAuth();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProcessTasks, setInProcessTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
     e.preventDefault();

    if(!title || !description || !date) {
      toast.error('Please fill in required fields');
      return;
    }

    setSubmitting(true);

    try {
      await axiosPrivate.post('/tasks', {
        title,
        description,
        date
      });

      toast.success('Task added successful!');

      setTitle('');
      setDescription('');
      setDate('');

      const res = await axiosPrivate.get('/tasks');
      setTasks(res.data);
      handleClose();

    } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error('Session expired. Please log in again.');
          setAuth({});
          navigate('/', { state: { from: location }, replace: true });
        } else {
          console.error(err);
          toast.error('Task adding failed. Please try again.');
        }
    } finally {
      setSubmitting(false);
    }
  }

  const handleStatus = async (taskId, status, taskTitle) => {
    try {
      let newStatus = status === 'Pending' ? 'In Progress' : 'Completed';
      await axiosPrivate.patch(`/tasks/status-update`, { id: taskId, status: newStatus });

      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );

      if (newStatus === 'In Progress') {
        toast.info(`${taskTitle} is now In Progress!`);
      } else {
        toast.success(`${taskTitle} Completed!`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update task.');
    }
  };

  useEffect(() => {
    setTodoTasks(tasks.filter(task => task.status.toLowerCase() === 'pending'));
    setInProcessTasks(tasks.filter(task => task.status.toLowerCase() === 'in progress'));
    setCompletedTasks(tasks.filter(task => task.status.toLowerCase() === 'completed'));
  }, [tasks]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axiosPrivate.get('/tasks');
        setTasks(response.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error('Session expired. Please log in again.');
          setAuth({});
          navigate('/', { state: { from: location }, replace: true });
        } else {
          console.error(err);
        }
      }
    }

    getTasks();
  }, [axiosPrivate, navigate, location, setAuth]);

  return (
    <div className="board">
      <div className="column">
        <div className='column-header'>
        <h2>To Do</h2>
        <button
          className="add-task-btn"
          onClick={() => (setShowModal(true))}
          title="Add new task"
        >
          <FiPlus size={16} />
        </button>
        </div>
        {todoTasks.length > 0 ? todoTasks.map(task => (
          <TaskCard key={task.id} task={task} handleStatus={handleStatus} />
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
            onClick={() => (setShowModal(true))}
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
          <TaskCard key={task.id} task={task} handleStatus={handleStatus} />
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
          <TaskCard key={task.id} task={task} handleStatus={handleStatus} />
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

      <AddTask
        isOpen={showModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        submitting={submitting}
      />
    </div>
  )
}
export default Tasks