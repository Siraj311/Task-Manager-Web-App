import './TaskCard.css';

const TaskCard = ({ task }) => {
  return (
    <div className="task">
      <h3 className="task-title">{task.title}</h3>
      <p className="task-text">{task.description}</p>
      <div className='task-footer'>

      </div>
    </div>
  )
}
export default TaskCard