import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const App = () => {
  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Utility to check if the user is logged in
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken'); // Check if the auth token exists
  };

  // Public Route Component
  const PublicRoute = ({ element }) => {
    return isAuthenticated() ? <Navigate to="/home" /> : element;
  };

  // Private Route Component
  const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };

  const AppContent = () => {
    const location = useLocation();
    const showNavbar = !['/', '/login', '/signup'].includes(location.pathname); // Hide Navbar for specific routes

    return (
      <>
        {showNavbar && <Navbar mode={mode} toggleTheme={toggleTheme} />}
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
          {/* Private routes */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;