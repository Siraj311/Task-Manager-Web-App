import './TaskCard.css';

const TaskCard = ({ task, handleStatus }) => {
  
  return (
    <div className={`task task-shadow-${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-text">{task.description}</p>
      <div className="task-footer">
        <span className="task-date">
          📅 Due: {new Date(task.due_date).toLocaleDateString()}
        </span>

        {task.status.toLowerCase() === 'completed' && (
          <span className={`task-status ${task.status.toLowerCase()}`}>
            {task.status}
          </span>
        )}

        {task.status.toLowerCase() !== "completed" && (
          <button
            className={`task-button task-button-${task.status.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => handleStatus(task.id, task.status, task.title)}
          >
            {task.status === "Pending" ? "Start Task" : "Mark as Completed"}
          </button>
        )}
      </div>
    </div>
  )
}
export default TaskCard