// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Todo from './components/Todo';
import ResponsiveAppBar from './components/Header'
import { CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
function App() {
  const {pathname} = useLocation();
  return (
    <div>
      <CssBaseline/>
      <ResponsiveAppBar pathname={pathname}/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
