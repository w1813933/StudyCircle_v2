const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// Get notes by user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    try {
        const notes = await Note.findByUser(userId);
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});

// Create note
router.post('/', async (req, res) => {
    try {
        const { userId, title, date, description } = req.body;
        const note = await Note.create({ userId, title, date, description });
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create note' });
    }
});

// Update note
router.put('/:id', async (req, res) => {
    try {
        await Note.update(req.params.id, req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update note' });
    }
});

// Delete note
router.delete('/:id', async (req, res) => {
    try {
        await Note.delete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

module.exports = router;