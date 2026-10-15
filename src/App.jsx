import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { GymProvider, useGym } from './context/GymContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberDetails from './pages/MemberDetails';
import Memberships from './pages/Memberships';
import Trainers from './pages/Trainers';
import Attendance from './pages/Attendance';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function AppRoutes() {
  const { isAuthenticated } = useGym();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Main Dashboard Layout with Sidebar, Navbar, and Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:id" element={<MemberDetails />} />
        <Route path="memberships" element={<Memberships />} />
        <Route path="trainers" element={<Trainers />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GymProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </GymProvider>
    </ThemeProvider>
  );
}

export default App;
