import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Drawer } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import MemberForm from './MemberForm';

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#F7F8FA' }}>
      {/* Desktop Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: 270 },
          flexShrink: { md: 0 },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box sx={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 270, zIndex: 1200 }}>
          <Sidebar />
        </Box>
      </Box>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 270,
            border: 'none',
          },
        }}
      >
        <Sidebar mobileOpen={mobileOpen} onMobileClose={handleDrawerToggle} />
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - 270px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#F7F8FA',
        }}
      >
        {/* Sticky Navbar */}
        <Navbar
          onMobileToggle={handleDrawerToggle}
          onOpenAddMember={() => setOpenAddModal(true)}
        />

        {/* Dynamic Route View */}
        <Box sx={{ flex: 1, pb: 4 }} className="fade-in">
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>

      {/* Global Quick Add Member Modal */}
      <MemberForm
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </Box>
  );
};
export default Layout;
