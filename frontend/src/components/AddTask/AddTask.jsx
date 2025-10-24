import './AddTask.css';

const AddTask = ({ isOpen, onClose, onSubmit, title, setTitle, description, setDescription, date, setDate, submitting }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✖</button>

        <div className="form-container">
          <h2 className="form-header">Add a Task</h2>

          <form onSubmit={onSubmit} className="form-body">
            <div className="form-field">
              <input type="text" placeholder="Title" 
              value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="form-field">
              <textarea type="text" placeholder="Description"
              value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className="form-field">
              <input
                id="date"
                type="date"
                placeholder="Due Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <button type="submit" className="form-button" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddTask