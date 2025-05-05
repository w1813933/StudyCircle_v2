//taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//Get tasks by user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    try {
      const tasks = await Task.findByUser(userId);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });

//Create task
router.post('/', async (req, res) => {
  try {
    const { userId, title, subject, date, description } = req.body; 

    if (!userId) {
      console.log("Missing userId in POST body");
      return res.status(400).json({ error: 'Missing userId' });
    }

    const task = await Task.create({ userId, title, subject, date, description });

    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

//Update task
router.put('/:id', async (req, res) => {
    try {
      await Task.update(req.params.id, req.body);
      res.json({ success: true }); // Send back a response
    } catch (err) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  });

//Complete task
router.patch('/:id/complete', async (req, res) => {
    try {
      await Task.markComplete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: 'Failed to mark task as complete' });
    }
  });

//Delete task
router.delete('/:id', async (req, res) => {
  try {
    await Task.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;

// Mark task as overdue

router.patch('/:id/overdue', async (req, res) => {
  try {
    await Task.markOverdue(req.params.id);
    res.sendStatus(204); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark task as overdue' });
  }
});