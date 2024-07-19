import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Archived from './components/Archieve';
import Trashed from './components/Trashed';
import SideBar from './components/SideNavbar';
import Header from './components/Header';
import Notes from './components/NotesList';

const App = () => {
  return (
    <div>
        <Header/>
        <div className='maincontainer'>
            
            <Router>
              <SideBar/>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Notes />} />
                <Route path='/archieve' element={<Archived/>}/>
                <Route path='/trash' Component={Trashed}/>
              </Routes>
            </Router>
        </div>
    </div>
  );
};

export default App;
