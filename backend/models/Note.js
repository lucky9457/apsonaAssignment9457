// models/Note.js
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String },
  tags: [{ type: String }],
  backgroundColor: { type: String, default: '#ffffff' },
  isArchived: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
  reminder: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
