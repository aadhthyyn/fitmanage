import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import NotificationAddRoundedIcon from '@mui/icons-material/NotificationAddRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import StatCard from '../components/StatCard';
import MemberForm from '../components/MemberForm';
import { useGym } from '../context/GymContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { members, attendance, memberships, updateMember } = useGym();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [activeChartTab, setActiveChartTab] = useState('attendance');

  const totalMembersCount = members.length;
  const activeMembersCount = members.filter((m) => m.status === 'Active').length;
  const expiringMembers = members.filter((m) => m.status === 'Expiring');
  const todayCheckins = attendance.filter((a) => a.status === 'Present').length;

  const handleQuickRenew = (id) => {
    updateMember(id, {
      status: 'Active',
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  // Mock attendance weekly bars data
  const weeklyData = [
    { day: 'Mon', count: 185, height: 65 },
    { day: 'Tue', count: 240, height: 85 },
    { day: 'Wed', count: 210, height: 75 },
    { day: 'Thu', count: 265, height: 92 },
    { day: 'Fri', count: 290, height: 100 },
    { day: 'Sat', count: 230, height: 80 },
    { day: 'Sun', count: 140, height: 50 },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Top Banner & Quick Actions */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.02em' }}>
              Welcome back, Manager
            </Typography>
            <Chip
              label="Live Sync"
              size="small"
              sx={{
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                fontWeight: 700,
                fontSize: '0.7rem',
                border: '1px solid #BBF7D0',
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Here is what is happening across your gym floor, memberships, and check-ins today.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button
            variant="outlined"
            startIcon={<EventAvailableRoundedIcon />}
            onClick={() => navigate('/attendance')}
            sx={{
              borderColor: '#E2E8F0',
              color: '#171A1F',
              py: 1,
              borderRadius: '10px',
              '&:hover': { borderColor: '#CBD5E1', backgroundColor: '#FFFFFF' },
            }}
          >
            Mark Attendance
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<PersonAddAlt1RoundedIcon />}
            onClick={() => setOpenAddModal(true)}
            sx={{
              backgroundColor: '#B7F34A',
              color: '#171A1F',
              fontWeight: 700,
              py: 1,
              px: 2.5,
              borderRadius: '10px',
              boxShadow: '0 4px 14px rgba(183, 243, 74, 0.35)',
              '&:hover': {
                backgroundColor: '#A3E337',
                boxShadow: '0 6px 18px rgba(183, 243, 74, 0.45)',
              },
            }}
          >
            Add New Member
          </Button>
        </Stack>
      </Box>

      {/* 4 Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Members"
            value="1,284"
            subtitle="Registered in system"
            icon={<PeopleAltRoundedIcon sx={{ fontSize: 26 }} />}
            iconBg="rgba(23, 26, 31, 0.08)"
            iconColor="#171A1F"
            trend="+12.4%"
            trendPositive={true}
            trendLabel="vs last month"
            accentColor="#171A1F"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Members"
            value="1,142"
            subtitle="88.9% active retention"
            icon={<CheckCircleRoundedIcon sx={{ fontSize: 26 }} />}
            iconBg="rgba(183, 243, 74, 0.25)"
            iconColor="#171A1F"
            trend="+5.2%"
            trendPositive={true}
            trendLabel="Active retention rate"
            accentColor="#B7F34A"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Monthly Revenue"
            value="$48,250"
            subtitle="Recurring membership dues"
            icon={<AttachMoneyRoundedIcon sx={{ fontSize: 26 }} />}
            iconBg="rgba(34, 197, 94, 0.15)"
            iconColor="#15803D"
            trend="+8.1%"
            trendPositive={true}
            trendLabel="vs target ($45k)"
            accentColor="#22C55E"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Today's Check-ins"
            value={`${todayCheckins * 57}`}
            subtitle="Floor peak at 6:00 PM"
            icon={<HowToRegRoundedIcon sx={{ fontSize: 26 }} />}
            iconBg="rgba(59, 130, 246, 0.15)"
            iconColor="#1D4ED8"
            trend="+14.6%"
            trendPositive={true}
            trendLabel="vs yesterday"
            accentColor="#3B82F6"
          />
        </Grid>
      </Grid>

      {/* Main Grid: Chart & Expiring Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Modern Chart / Activity Overview */}
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid #E6E8EC',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.01em' }}>
                  Weekly Gym Traffic & Peak Capacity
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B' }}>
                  Average daily floor turnstile entries over the last 7 days
                </Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant={activeChartTab === 'attendance' ? 'contained' : 'outlined'}
                  onClick={() => setActiveChartTab('attendance')}
                  sx={{
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    backgroundColor: activeChartTab === 'attendance' ? '#171A1F' : 'transparent',
                    color: activeChartTab === 'attendance' ? '#FFFFFF' : '#64748B',
                    borderColor: '#E2E8F0',
                  }}
                >
                  Turnstiles
                </Button>
                <Button
                  size="small"
                  variant={activeChartTab === 'revenue' ? 'contained' : 'outlined'}
                  onClick={() => setActiveChartTab('revenue')}
                  sx={{
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    backgroundColor: activeChartTab === 'revenue' ? '#171A1F' : 'transparent',
                    color: activeChartTab === 'revenue' ? '#FFFFFF' : '#64748B',
                    borderColor: '#E2E8F0',
                  }}
                >
                  Revenue Trends
                </Button>
              </Stack>
            </Box>

            {/* Custom Interactive Bars Graphic with Electric Lime Accent */}
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: 220,
                  px: { xs: 1, sm: 3 },
                  gap: 1.5,
                }}
              >
                {weeklyData.map((item, idx) => {
                  const isPeak = item.day === 'Fri';
                  return (
                    <Box
                      key={item.day}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flex: 1,
                        height: '100%',
                        justifyContent: 'flex-end',
                        position: 'relative',
                        '&:hover .bar-tooltip': {
                          opacity: 1,
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      {/* Hover Tooltip */}
                      <Box
                        className="bar-tooltip"
                        sx={{
                          position: 'absolute',
                          top: `${200 - (item.height * 1.8) - 30}px`,
                          backgroundColor: '#171A1F',
                          color: '#B7F34A',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          py: 0.4,
                          px: 1,
                          borderRadius: '6px',
                          opacity: isPeak ? 1 : 0,
                          transition: 'all 0.2s ease',
                          pointerEvents: 'none',
                          whiteSpace: 'nowrap',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        }}
                      >
                        {item.count} check-ins
                      </Box>

                      {/* Bar Pillar */}
                      <Box
                        sx={{
                          width: '100%',
                          maxWidth: 42,
                          height: `${item.height * 1.8}px`,
                          backgroundColor: isPeak ? '#B7F34A' : '#E2E8F0',
                          borderRadius: '8px 8px 4px 4px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: isPeak ? '#A3E337' : '#CBD5E1',
                            transform: 'scaleY(1.03)',
                          },
                        }}
                      />

                      <Typography
                        variant="caption"
                        sx={{
                          mt: 1.5,
                          fontWeight: isPeak ? 700 : 500,
                          color: isPeak ? '#171A1F' : '#64748B',
                          fontSize: '0.8rem',
                        }}
                      >
                        {item.day}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Bottom Chart Footer Legend */}
            <Box
              sx={{
                mt: 3,
                pt: 2,
                borderTop: '1px solid #F1F5F9',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '3px', backgroundColor: '#B7F34A' }} />
                  <Typography variant="caption" sx={{ color: '#475569', fontWeight: 600 }}>
                    Peak Day (Friday: 290 Check-ins)
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '3px', backgroundColor: '#E2E8F0' }} />
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    Weekday Standard Traffic
                  </Typography>
                </Box>
              </Box>

              <Typography variant="caption" sx={{ color: '#16A34A', fontWeight: 700 }}>
                ⚡ 99.4% Turnstile Uptime
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Membership Expiry Overview */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid #E6E8EC',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: '#FFF7ED',
                      color: '#EA580C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <WarningAmberRoundedIcon sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F', fontSize: '1.05rem' }}>
                    Expiring Memberships
                  </Typography>
                </Box>

                <Chip
                  label={`${expiringMembers.length} Due`}
                  size="small"
                  sx={{
                    backgroundColor: '#FFEDD5',
                    color: '#C2410C',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5, fontSize: '0.85rem' }}>
                These members have their subscriptions expiring within 14 days.
              </Typography>

              <Stack spacing={1.8}>
                {expiringMembers.map((member) => (
                  <Box
                    key={member.id}
                    sx={{
                      p: 1.8,
                      borderRadius: '12px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#CBD5E1',
                        backgroundColor: '#FFFFFF',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={member.avatar} alt={member.name} sx={{ width: 40, height: 40 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#171A1F' }}>
                          {member.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#EA580C', fontWeight: 600 }}>
                          Expires: {member.expiryDate}
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleQuickRenew(member.id)}
                      startIcon={<AutorenewRoundedIcon sx={{ fontSize: '15px !important' }} />}
                      sx={{
                        backgroundColor: '#171A1F',
                        color: '#B7F34A',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        py: 0.5,
                        px: 1.5,
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: '#2A2F38',
                        },
                      }}
                    >
                      Renew
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/members')}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                mt: 3,
                borderColor: '#E2E8F0',
                color: '#171A1F',
                borderRadius: '10px',
                py: 1,
                fontSize: '0.85rem',
                '&:hover': { borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' },
              }}
            >
              View All Member Expiries
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Registrations Table Section */}
      <Card
        sx={{
          borderRadius: '16px',
          border: '1px solid #E6E8EC',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          p: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 2.5,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.01em' }}>
              Recent Member Registrations
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Recently enrolled athletes and active gym profiles
            </Typography>
          </Box>

          <Button
            variant="text"
            onClick={() => navigate('/members')}
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              color: '#171A1F',
              fontWeight: 700,
              fontSize: '0.85rem',
              '&:hover': { backgroundColor: 'rgba(23, 26, 31, 0.05)' },
            }}
          >
            Go to Member Directory
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member Profile</TableCell>
                <TableCell>Membership Tier</TableCell>
                <TableCell>Assigned Trainer</TableCell>
                <TableCell>Enrolled Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.slice(0, 5).map((member) => (
                <TableRow
                  key={member.id}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#F8FAFC !important' },
                  }}
                  onClick={() => navigate(`/members/${member.id}`)}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        sx={{ width: 42, height: 42, borderRadius: '12px' }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#171A1F' }}>
                          {member.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>
                          {member.email} • {member.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={member.plan}
                      size="small"
                      sx={{
                        backgroundColor:
                          member.plan === 'VIP Black Card'
                            ? '#171A1F'
                            : member.plan === 'Elite Athlete'
                            ? '#E0F2FE'
                            : '#F1F5F9',
                        color:
                          member.plan === 'VIP Black Card'
                            ? '#B7F34A'
                            : member.plan === 'Elite Athlete'
                            ? '#0369A1'
                            : '#334155',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#171A1F', fontWeight: 500 }}>
                      {member.assignedTrainer}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      {member.joinDate}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={member.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          member.status === 'Active'
                            ? '#DCFCE7'
                            : member.status === 'Expiring'
                            ? '#FFEDD5'
                            : '#FEE2E2',
                        color:
                          member.status === 'Active'
                            ? '#15803D'
                            : member.status === 'Expiring'
                            ? '#C2410C'
                            : '#B91C1C',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                      }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/members/${member.id}`);
                      }}
                      sx={{
                        borderColor: '#E2E8F0',
                        color: '#171A1F',
                        fontSize: '0.75rem',
                        py: 0.4,
                        px: 1.5,
                        borderRadius: '8px',
                        '&:hover': {
                          borderColor: '#171A1F',
                          backgroundColor: '#F8FAFC',
                        },
                      }}
                    >
                      View Profile
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Add Member Dialog */}
      <MemberForm
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
    </Box>
  );
};
export default Dashboard;
