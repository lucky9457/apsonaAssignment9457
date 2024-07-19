const express = require('express');
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate user
router.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');
  try {
    const verified = jwt.verify(token, 'secret_key');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
});

// Create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, tags, backgroundColor, reminder } = req.body;
    const note = new Note({ userId: req.user.userId, title, content, tags, backgroundColor, reminder });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId, isArchived: false, isTrashed: false });
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  try {
    const { title, content, tags, backgroundColor, reminder } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title, content, tags, backgroundColor, reminder },
      { new: true }
    );
    if (!note) return res.status(404).send('Note not found');
    res.status(200).json(note);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!note) return res.status(404).send('Note not found');
    res.status(200).send('Note deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Archive a note
router.put('/:id/archive', async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { isArchived: true },
      { new: true }
    );
    if (!note) return res.status(404).send('Note not found');
    res.status(200).json(note);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Retrieve archived notes
router.get('/archived', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId, isArchived: true , isTrashed:false });
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Trash a note (soft delete)
router.put('/:id/trash', async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { isTrashed: true, trashedAt: Date.now() },
      { new: true }
    );
    if (!note) return res.status(404).send('Note not found');
    res.status(200).json(note);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Retrieve trashed notes (soft deleted)
router.get('/trashed', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId, isTrashed: true });
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
