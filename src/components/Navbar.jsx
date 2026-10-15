import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Chip,
  Tooltip,
  Divider,
  Paper,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import { useGym } from '../context/GymContext';

const PAGE_TITLES = {
  '/': 'Gym Dashboard',
  '/dashboard': 'Gym Dashboard',
  '/members': 'Member Directory',
  '/memberships': 'Membership Plans',
  '/trainers': 'Trainers & Coaches',
  '/attendance': 'Daily Attendance & Check-ins',
  '/profile': 'Club & Manager Profile',
};

export const Navbar = ({ onMobileToggle, onOpenAddMember }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, logout, members, attendance } = useGym();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenUserMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const handleOpenNotif = (event) => setNotifAnchorEl(event.currentTarget);
  const handleCloseNotif = () => setNotifAnchorEl(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate('/login');
  };

  const currentTitle = PAGE_TITLES[location.pathname] || 'FitManage Pro';

  const presentCount = attendance.filter((a) => a.status === 'Present').length;
  const expiringCount = members.filter((m) => m.status === 'Expiring').length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/members?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Box
      component="header"
      sx={{
        height: 74,
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E6E8EC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Left: Hamburger & Page Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton
          onClick={onMobileToggle}
          sx={{
            display: { xs: 'inline-flex', md: 'none' },
            color: '#171A1F',
            backgroundColor: '#F1F5F9',
            borderRadius: '10px',
            p: 1,
            '&:hover': { backgroundColor: '#E2E8F0' },
          }}
        >
          <MenuRoundedIcon />
        </IconButton>

        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.05rem', sm: '1.25rem' },
              color: '#171A1F',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {currentTitle}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#64748B',
              fontSize: '0.75rem',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {userProfile.gymName} • Live Overview
          </Typography>
        </Box>
      </Box>

      {/* Center: Quick Search Bar */}
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          backgroundColor: '#F7F8FA',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          px: 1.8,
          py: 0.6,
          width: 340,
          transition: 'all 0.2s ease',
          '&:focus-within': {
            borderColor: '#171A1F',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 0 3px rgba(23, 26, 31, 0.06)',
          },
        }}
      >
        <SearchRoundedIcon sx={{ color: '#94A3B8', fontSize: 20, mr: 1 }} />
        <InputBase
          placeholder="Search members, phone, plans..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            fontSize: '0.85rem',
            width: '100%',
            color: '#171A1F',
            '& input::placeholder': { color: '#94A3B8', opacity: 1 },
          }}
        />
        <Chip
          label="⌘K"
          size="small"
          sx={{
            height: 20,
            fontSize: '0.65rem',
            fontWeight: 700,
            backgroundColor: '#E2E8F0',
            color: '#64748B',
          }}
        />
      </Box>

      {/* Right Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        {/* Active Members Status Badge */}
        <Chip
          icon={<CheckCircleRoundedIcon sx={{ fontSize: '14px !important', color: '#16A34A !important' }} />}
          label={`${presentCount} Active on Floor`}
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            backgroundColor: '#F0FDF4',
            color: '#15803D',
            border: '1px solid #DCFCE7',
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 30,
            px: 0.5,
          }}
        />

        {/* Quick Add Member Button */}
        {onOpenAddMember && (
          <Button
            variant="contained"
            color="secondary"
            onClick={onOpenAddMember}
            startIcon={<PersonAddAlt1RoundedIcon sx={{ fontSize: '18px !important' }} />}
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              backgroundColor: '#B7F34A',
              color: '#171A1F',
              fontWeight: 700,
              fontSize: '0.82rem',
              px: 2,
              py: 0.8,
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(183, 243, 74, 0.35)',
              '&:hover': {
                backgroundColor: '#A3E337',
                boxShadow: '0 6px 16px rgba(183, 243, 74, 0.45)',
              },
            }}
          >
            Add Member
          </Button>
        )}

        {/* Notification Bell */}
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleOpenNotif}
            sx={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              p: 1.1,
              color: '#171A1F',
              '&:hover': {
                backgroundColor: '#F1F5F9',
              },
            }}
          >
            <Badge
              badgeContent={expiringCount > 0 ? expiringCount : null}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#EA580C',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.65rem',
                  height: 18,
                  minWidth: 18,
                },
              }}
            >
              <NotificationsNoneRoundedIcon sx={{ fontSize: 21 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Notification Menu */}
        <Menu
          anchorEl={notifAnchorEl}
          open={Boolean(notifAnchorEl)}
          onClose={handleCloseNotif}
          PaperProps={{
            sx: {
              mt: 1.5,
              width: 320,
              borderRadius: '14px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
              p: 1,
            },
          }}
        >
          <Box sx={{ px: 1.5, py: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#171A1F' }}>
              Notifications ({expiringCount})
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              Real-time membership & club alerts
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />
          {expiringCount > 0 ? (
            <MenuItem
              onClick={() => {
                handleCloseNotif();
                navigate('/members');
              }}
              sx={{ borderRadius: '8px', py: 1 }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#EA580C' }}>
                  ⚠️ {expiringCount} Memberships Expiring Soon
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Renewals due within the next 14 days
                </Typography>
              </Box>
            </MenuItem>
          ) : (
            <MenuItem sx={{ py: 1.5 }}>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                All systems active. No pending alerts.
              </Typography>
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              handleCloseNotif();
              navigate('/attendance');
            }}
            sx={{ borderRadius: '8px', py: 1 }}
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#171A1F' }}>
                🏋️ Peak Hours Starting
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>
                Evening check-ins trending +14% vs yesterday
              </Typography>
            </Box>
          </MenuItem>
        </Menu>

        {/* User Profile Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{
              p: 0.3,
              border: '2px solid #E2E8F0',
              borderRadius: '12px',
              transition: 'border-color 0.2s',
              '&:hover': { borderColor: '#B7F34A' },
            }}
          >
            <Avatar
              src={userProfile.avatar}
              alt={userProfile.name}
              sx={{ width: 36, height: 36, borderRadius: '10px' }}
            />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 220,
                borderRadius: '14px',
                p: 0.8,
                boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
              },
            }}
          >
            <Box sx={{ px: 1.5, py: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#171A1F' }}>
                {userProfile.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                {userProfile.email}
              </Typography>
            </Box>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                navigate('/profile');
              }}
              sx={{ borderRadius: '8px', py: 1 }}
            >
              <PersonOutlineRoundedIcon sx={{ fontSize: 18, mr: 1.5, color: '#64748B' }} />
              Profile Details
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseUserMenu();
                navigate('/profile');
              }}
              sx={{ borderRadius: '8px', py: 1 }}
            >
              <SettingsRoundedIcon sx={{ fontSize: 18, mr: 1.5, color: '#64748B' }} />
              Gym Settings
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={handleLogout}
              sx={{
                borderRadius: '8px',
                py: 1,
                color: '#DC2626',
                '&:hover': { backgroundColor: '#FEF2F2' },
              }}
            >
              <LogoutRoundedIcon sx={{ fontSize: 18, mr: 1.5 }} />
              Sign Out
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};
export default Navbar;
