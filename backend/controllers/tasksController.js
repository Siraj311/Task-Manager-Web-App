const pool = require('../config/db');
const asyncHandler = require('express-async-handler');

// GET /api/v1/tasks
const getTasks = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT id, title, description, status, due_date, assignee_id, created_at, updated_at
      FROM tasks
      WHERE assignee_id = $1
      ORDER BY updated_at`,
      [userId]
    );

    const tasks = result.rows;

    if(!tasks || tasks?.length === 0) {
        return res.status(200).json([]);
    }

    res.status(200).json(tasks);
})

// GET /api/v1/tasks/count
const getTasksCount = asyncHandler(async (req, res) => {
    const result = await pool.query(
      `SELECT COUNT(*) as count
      FROM tasks`
    );

    const tasks = result.rows;

    if(!tasks) {
        return res.status(200).json({ taskCount: 0 });
    }

    res.status(200).json({ taskCount: tasks });
})


// POST /api/v1/tasks
const createTask = asyncHandler(async (req, res) => {
    const { title, description, date, assignee_id } = req.body;
    const userId = req.user.id; 
    let assigneeId = assignee_id || userId;

    if (!title || !description || !date) {
        return res.status(400).json({ message: 'Title, description, and date are required' })
    }

    const duplicateCheck = await pool.query(
        'SELECT id FROM tasks WHERE assignee_id = $1 AND title = $2',
        [assigneeId, title]
    );

    if (duplicateCheck.rows.length > 0) {
        return res.status(409).json({ message: 'Duplicate task title' });
    }

    await pool.query(
        'INSERT INTO tasks (assignee_id, created_by, title, description, due_date) VALUES ($1, $2, $3, $4, $5)',
        [assigneeId, userId, title, description, date]
    );

    res.status(201).json({ message: 'New task created' });
})

// PATCH /api/v1/tasks/status-update
const statusUpdate = asyncHandler(async (req, res) => {
    const { id, status, assignee_id } = req.body;
    const userId = req.user.id; 
    const assigneeId = assignee_id || userId;

    if (!id) {
        return res.status(400).json({ message: 'Task Id is required' })
    }

    const taskCheck = await pool.query(
        'SELECT * FROM tasks WHERE id = $1 AND assignee_id = $2',
        [id, assigneeId]
    );

    if (taskCheck.rows.length === 0) {
        return res.status(404).json({ message: 'Task not found' });
    }

    await pool.query(
        'UPDATE tasks SET status = $1 WHERE id = $2',
        [status, id]
    );

    res.status(200).json({ message: `Task '${taskCheck.rows[0].title}' Updated` });
})


module.exports = {
  getTasks,
  createTask,
  statusUpdate
}