// src/components/EditNotePopup.js
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import './createNotepopup.css'; // Reuse the same CSS styles

const EditNotePopup = ({ note, onEditNote }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags);
  const [backgroundColor, setBackgroundColor] = useState(note.backgroundColor);
  const [reminder, setReminder] = useState(note.reminder);

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    try {
      const updatedNoteData = { title, content, tags, backgroundColor, reminder };
      await onEditNote(note._id, updatedNoteData);
      Popup.close(); // Close the popup after editing the note
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <Popup
      trigger={<button className="button">Edit</button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>&times;</button>
          <div className="header"> Edit Note </div>
          <div className="content">
            <form onSubmit={(e) => handleSubmit(e, close)}>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

              <label>Content:</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} required />

              <label>Tags:</label>
              <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />

              <label>Background Color:</label>
              <input type="text" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />

              <label>Reminder:</label>
              <input type="datetime-local" value={reminder} onChange={(e) => setReminder(e.target.value)} />

              <button type="submit">Save</button>
              <button type="button" onClick={close}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default EditNotePopup;
