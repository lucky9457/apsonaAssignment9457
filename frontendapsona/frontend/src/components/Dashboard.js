import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import Cookies from 'js-cookie';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [trashedNotes, setTrashedNotes] = useState([]);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const token = Cookies.get('token');
    const res = await axios.get('/api/notes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(res.data);
  };

  const fetchArchivedNotes = async () => {
    const token = Cookies.get('token');
    const res = await axios.get('/api/notes/archived', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setArchivedNotes(res.data);
  };

  const fetchTrashedNotes = async () => {
    const token = Cookies.get('token');
    const res = await axios.get('/api/notes/trashed', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTrashedNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
    fetchArchivedNotes();
    fetchTrashedNotes();
  }, []);

  const handleEdit = (note) => {
    // Handle edit logic
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
  };

  const handleArchive = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`/api/notes/${id}/archive`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
    fetchArchivedNotes();
  };

  const handleTrash = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`/api/notes/${id}/trash`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchNotes();
    fetchTrashedNotes();
  };

  return (
    <div className="dashboard">
      <h2>Notes</h2>
      <div className="notes-list">
        {notes.map((note) => (
          <Note
            key={note._id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onTrash={handleTrash}
          />
        ))}
      </div>

      <h2>Archived Notes</h2>
      <div className="notes-list">
        {archivedNotes.map((note) => (
          <Note
            key={note._id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onTrash={handleTrash}
          />
        ))}
      </div>

      <h2>Trashed Notes</h2>
      <div className="notes-list">
        {trashedNotes.map((note) => (
          <Note
            key={note._id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onTrash={handleTrash}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
