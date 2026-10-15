import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import SportsGymnasticsRoundedIcon from '@mui/icons-material/SportsGymnasticsRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useGym } from '../context/GymContext';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardRoundedIcon /> },
  { label: 'Members', path: '/members', icon: <PeopleAltRoundedIcon />, badge: 'New' },
  { label: 'Memberships', path: '/memberships', icon: <CardMembershipRoundedIcon /> },
  { label: 'Trainers', path: '/trainers', icon: <SportsGymnasticsRoundedIcon /> },
  { label: 'Attendance', path: '/attendance', icon: <EventAvailableRoundedIcon />, live: true },
  { label: 'Profile & Settings', path: '/profile', icon: <AccountCircleRoundedIcon /> },
];

export const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, logout, members } = useGym();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const content = (
    <Box
      sx={{
        width: 270,
        height: '100%',
        minHeight: '100vh',
        backgroundColor: '#171A1F',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2.5,
        boxSizing: 'border-box',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Top Header & Brand */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
            px: 1,
            pt: 0.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/dashboard')}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                backgroundColor: '#B7F34A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(183, 243, 74, 0.35)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <FitnessCenterRoundedIcon sx={{ color: '#171A1F', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  lineHeight: 1.1,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                Fit<span style={{ color: '#B7F34A' }}>Manage</span>
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#94A3B8',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Gym Cloud OS
              </Typography>
            </Box>
          </Box>

          {onMobileClose && (
            <IconButton
              onClick={onMobileClose}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: '#94A3B8',
                '&:hover': { color: '#FFFFFF' },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>
          )}
        </Box>

        {/* Navigation Section */}
        <Typography
          variant="caption"
          sx={{
            px: 1.5,
            mb: 1.5,
            display: 'block',
            color: '#64748B',
            fontWeight: 700,
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Main Navigation
        </Typography>

        <List sx={{ p: 0 }}>
          {NAV_ITEMS.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === '/dashboard' && location.pathname === '/');

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.8 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={onMobileClose}
                  sx={{
                    borderRadius: '12px',
                    py: 1.1,
                    px: 1.8,
                    backgroundColor: isActive ? 'rgba(183, 243, 74, 0.12)' : 'transparent',
                    color: isActive ? '#B7F34A' : '#94A3B8',
                    border: isActive
                      ? '1px solid rgba(183, 243, 74, 0.28)'
                      : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: isActive
                        ? 'rgba(183, 243, 74, 0.16)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isActive ? '#B7F34A' : '#FFFFFF',
                      transform: 'translateX(3px)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 38,
                      color: isActive ? '#B7F34A' : '#94A3B8',
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.9rem',
                    }}
                  />
                  {item.badge && (
                    <Chip
                      label={members?.length || '8'}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        backgroundColor: isActive ? '#B7F34A' : 'rgba(255,255,255,0.1)',
                        color: isActive ? '#171A1F' : '#E2E8F0',
                      }}
                    />
                  )}
                  {item.live && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <FiberManualRecordIcon
                        sx={{
                          fontSize: 10,
                          color: '#B7F34A',
                          animation: 'pulse 1.8s infinite',
                          '@keyframes pulse': {
                            '0%': { opacity: 0.4 },
                            '50%': { opacity: 1 },
                            '100%': { opacity: 0.4 },
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#B7F34A',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                        }}
                      >
                        LIVE
                      </Typography>
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Gym Card & User Snippet */}
      <Box>
        {/* Subtle Gym Status Box */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '14px',
            p: 1.8,
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.82rem' }}>
              FitManage Pro Center
            </Typography>
            <Chip
              label="24/7 OPEN"
              size="small"
              sx={{
                backgroundColor: 'rgba(183, 243, 74, 0.15)',
                color: '#B7F34A',
                fontWeight: 700,
                fontSize: '0.65rem',
                height: 18,
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', fontSize: '0.73rem', mb: 1 }}>
            Downtown Club • Floor Capacity 82%
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 4,
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '82%',
                height: '100%',
                backgroundColor: '#B7F34A',
                borderRadius: 2,
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', mb: 2 }} />

        {/* User Card */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 0.5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/profile')}
          >
            <Avatar
              src={userProfile.avatar}
              alt={userProfile.name}
              sx={{
                width: 38,
                height: 38,
                border: '2px solid #B7F34A',
              }}
            />
            <Box sx={{ maxWidth: 130 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {userProfile.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#94A3B8',
                  fontSize: '0.7rem',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                Admin / Manager
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={handleLogout}
            title="Sign Out"
            sx={{
              color: '#94A3B8',
              p: 1,
              borderRadius: '10px',
              transition: 'all 0.2s',
              '&:hover': {
                color: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
              },
            }}
          >
            <LogoutRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return content;
};
export default Sidebar;
