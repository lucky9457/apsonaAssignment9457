// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Archived from './components/Archieve';

import Trashed from './components/Trashed';
import SideBar from './components/SideNavbar';
import Header from './components/Header';
import Notes from './components/NotesList';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
  const location = useLocation();
  const hideHeaderAndSidebar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {!hideHeaderAndSidebar && <Header />}
      <div className='maincontainer'>
        {!hideHeaderAndSidebar && <SideBar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Notes />} />} />
          <Route path='/archieve' element={<ProtectedRoute element={<Archived />} />} />
          <Route path='/trash' element={<ProtectedRoute element={<Trashed />} />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
