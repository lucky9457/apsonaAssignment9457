// src/components/CreateNotePopup.js
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';
import './createNotepopup.css'; // Import the CSS file

const CreateNotePopup = ({ onCreateNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newNoteData = { title, content, tags, backgroundColor, reminder };
      await onCreateNote(newNoteData);
      setTitle('');
      setContent('');
      setTags('');
      setBackgroundColor('');
      setReminder('');
      closePopup(); // Close the popup after creating the note
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const closePopup = () => {
    Popup.close(); // Close the popup
  };

  return (
    <Popup
      trigger={<button className="button buttoncreate">Create Note</button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>&times;</button>
          <div className="header"> Create Note </div>
          <div className="content">
            <form onSubmit={handleSubmit}>
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

              <button type="submit">Create</button>
              <button type="button" onClick={close}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default CreateNotePopup;
