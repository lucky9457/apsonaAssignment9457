// src/components/Note.js
import React, { useState } from 'react';
import "../App.css";
import Popup from 'reactjs-popup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag,faPencil} from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

const Note = ({ note, onEdit, onDelete, onArchive, onTrash }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags);
  const [backgroundColor, setBackgroundColor] = useState(note.backgroundColor);
  const [reminder, setReminder] = useState(note.reminder);
  const [listag,setlistag] = useState([])
  const [labels, setLabels] = useState(note.tags || []);

  const handleEditNote = async (e) => {
    e.preventDefault();
    const updatedNoteData = { title, content, tags, backgroundColor, reminder };
    await onEdit(note._id, updatedNoteData);
    
    setIsPopupOpen(false); // Close the popup after editing the note
  };

  return (
    <div className="note" style={{ backgroundColor: note.backgroundColor }}>
      <h3>{note.title}</h3>
      <p className='para'>{note.content}</p>
      
      <div className="note-actions">
        <button className='btns' onClick={() => setIsPopupOpen(true)}>Edit</button>

        <button className='btns' onClick={() => onArchive(note._id)}>Archive</button>
        <button className='btns' onClick={() => onTrash(note._id)}>Trash</button>
      </div>
      <p className='labless'>{note.tags && <FontAwesomeIcon icon={faTag} />} {note.tags && note.tags.join(', ')}</p>
      

      <Popup open={isPopupOpen} closeOnDocumentClick onClose={() => setIsPopupOpen(false)}>
        <div className="modal">
          <button className="close" onClick={() => setIsPopupOpen(false)}>
            &times;
          </button>
          <div className="header"> Edit Note </div>
          <div className="content">
            <form onSubmit={handleEditNote}>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Content:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />

              <label>Tags:</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <label>Background Color:</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
              <br/>
              <br/>
              <label>Reminder:</label>
              <input
                type="datetime-local"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              />

              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsPopupOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Note;
