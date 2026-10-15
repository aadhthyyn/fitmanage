import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  InputAdornment,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import StatCard from '../components/StatCard';
import { useGym } from '../context/GymContext';

const ZONES = [
  'Main Gym Floor',
  'CrossFit Box',
  'Studio B (Spin)',
  'Recovery Lounge & Sauna',
  'Executive Free Weights',
];

export const Attendance = () => {
  const { attendance, members, markAttendance } = useGym();

  const [searchMember, setSearchMember] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [zoneFilter, setZoneFilter] = useState('All');

  // Quick Check-in modal
  const [openCheckInModal, setOpenCheckInModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [selectedZone, setSelectedZone] = useState('Main Gym Floor');

  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const matchesSearch =
        record.memberName.toLowerCase().includes(searchMember.toLowerCase()) ||
        record.memberId.toLowerCase().includes(searchMember.toLowerCase());
      const matchesDate = record.date === selectedDate;
      const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
      const matchesZone = zoneFilter === 'All' || record.zone === zoneFilter;

      return matchesSearch && matchesDate && matchesStatus && matchesZone;
    });
  }, [attendance, searchMember, selectedDate, statusFilter, zoneFilter]);

  const presentCount = attendance.filter((a) => a.date === selectedDate && a.status === 'Present').length;
  const absentCount = attendance.filter((a) => a.date === selectedDate && a.status === 'Absent').length;

  const handleQuickCheckIn = (e) => {
    e.preventDefault();
    if (!selectedMemberId) return;
    markAttendance(selectedMemberId, 'Present', selectedZone);
    setOpenCheckInModal(false);
    setSelectedMemberId('');
  };

  const handleToggleStatus = (record) => {
    const nextStatus = record.status === 'Present' ? 'Absent' : 'Present';
    markAttendance(record.memberId, nextStatus, record.zone === '-' ? 'Main Gym Floor' : record.zone);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Page Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.02em' }}>
              Turnstile & Daily Attendance
            </Typography>
            <Chip
              label={`${presentCount} Present Today`}
              size="small"
              sx={{
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                fontWeight: 700,
                fontSize: '0.75rem',
                border: '1px solid #BBF7D0',
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Live record of member turnstile entries, session duration, and workout zones.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<HowToRegRoundedIcon />}
          onClick={() => setOpenCheckInModal(true)}
          sx={{
            backgroundColor: '#B7F34A',
            color: '#171A1F',
            fontWeight: 700,
            py: 1.1,
            px: 2.8,
            borderRadius: '10px',
            boxShadow: '0 4px 14px rgba(183, 243, 74, 0.35)',
            '&:hover': {
              backgroundColor: '#A3E337',
              boxShadow: '0 6px 20px rgba(183, 243, 74, 0.45)',
            },
          }}
        >
          Check-in Member
        </Button>
      </Box>

      {/* 4 Stat Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Present Today"
            value={presentCount}
            subtitle="Verified badge scans"
            icon={<CheckCircleRoundedIcon sx={{ fontSize: 26 }} />}
            iconBg="rgba(34, 197, 94, 0.15)"
            iconColor="#15803D"
            trend="+18%"
            trendPositive={true}
            trendLabel="vs yesterday"
            accentColor="#22C55E"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Absent / Pending"
            value={absentCount}
            subtitle="Expected reservations"
            icon={<CancelRoundedIcon sx={{ fontSize: 26 }} />}
            iconBg="rgba(239, 68, 68, 0.12)"
            iconColor="#DC2626"
            trend="-4%"
            trendPositive={true}
            trendLabel="Missed class rate"
            accentColor="#EF4444"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Floor Occupancy"
            value="74%"
            subtitle="320 capacity limit"
            icon={<EventAvailableRoundedIcon sx={{ fontSize: 26 }} />}
            iconBg="rgba(183, 243, 74, 0.25)"
            iconColor="#171A1F"
            trend="+8%"
            trendPositive={true}
            trendLabel="Peak at 6:00 PM"
            accentColor="#B7F34A"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Average Workout"
            value="68 min"
            subtitle="Session dwell duration"
            icon={<AccessTimeRoundedIcon sx={{ fontSize: 26 }} />}
            iconBg="rgba(23, 26, 31, 0.08)"
            iconColor="#171A1F"
            trend="+5 min"
            trendPositive={true}
            trendLabel="Optimal endurance"
            accentColor="#171A1F"
          />
        </Grid>
      </Grid>

      {/* Filter and Date Selector */}
      <Card
        sx={{
          p: 2.5,
          borderRadius: '16px',
          border: '1px solid #E6E8EC',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          mb: 3,
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
        >
          <TextField
            placeholder="Search member name or ID..."
            value={searchMember}
            onChange={(e) => setSearchMember(e.target.value)}
            size="small"
            sx={{ flex: 1.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ flex: 2 }}>
            <TextField
              type="date"
              label="Selected Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              size="small"
              sx={{ minWidth: 160 }}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              select
              label="Attendance Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Present">Present Only</MenuItem>
              <MenuItem value="Absent">Absent Only</MenuItem>
            </TextField>

            <TextField
              select
              label="Workout Zone"
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 170 }}
            >
              <MenuItem value="All">All Workout Zones</MenuItem>
              {ZONES.map((z) => (
                <MenuItem key={z} value={z}>
                  {z}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </Stack>
      </Card>

      {/* Attendance Table */}
      <Card
        sx={{
          borderRadius: '16px',
          border: '1px solid #E6E8EC',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member Profile</TableCell>
                <TableCell>Membership Tier</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Check-in Time</TableCell>
                <TableCell>Check-out Time</TableCell>
                <TableCell>Workout Zone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Quick Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAttendance.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#171A1F', mb: 0.5 }}>
                      No attendance records found for this date
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B' }}>
                      Click "Check-in Member" above to record entries.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAttendance.map((record) => {
                  const isPresent = record.status === 'Present';

                  return (
                    <TableRow key={record.id} hover sx={{ '&:hover': { backgroundColor: '#F8FAFC !important' } }}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            src={record.avatar}
                            alt={record.memberName}
                            sx={{ width: 40, height: 40, borderRadius: '10px' }}
                          />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#171A1F' }}>
                              {record.memberName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748B' }}>
                              {record.memberId}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={record.plan}
                          size="small"
                          sx={{
                            backgroundColor: '#F1F5F9',
                            color: '#334155',
                            fontWeight: 600,
                            fontSize: '0.72rem',
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#171A1F' }}>
                          {record.date}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#171A1F' }}>
                          {record.checkInTime}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: record.checkOutTime === 'In Session' ? '#15803D' : '#64748B',
                            fontWeight: record.checkOutTime === 'In Session' ? 700 : 400,
                          }}
                        >
                          {record.checkOutTime}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#171A1F' }}>
                          {record.zone}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={record.status}
                          size="small"
                          sx={{
                            backgroundColor: isPresent ? '#DCFCE7' : '#FEE2E2',
                            color: isPresent ? '#15803D' : '#B91C1C',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                          }}
                        />
                      </TableCell>

                      <TableCell align="right">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleToggleStatus(record)}
                          sx={{
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            py: 0.4,
                            px: 1.5,
                            borderColor: '#CBD5E1',
                            color: isPresent ? '#B91C1C' : '#15803D',
                            '&:hover': {
                              backgroundColor: isPresent ? '#FEF2F2' : '#F0FDF4',
                              borderColor: isPresent ? '#F87171' : '#86EFAC',
                            },
                          }}
                        >
                          Mark as {isPresent ? 'Absent' : 'Present'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Quick Check-in Dialog */}
      <Dialog
        open={openCheckInModal}
        onClose={() => setOpenCheckInModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '16px' } }}
      >
        <DialogTitle
          sx={{
            backgroundColor: '#171A1F',
            color: '#FFFFFF',
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#FFFFFF' }}>
            Check-in Member to Floor
          </Typography>
          <IconButton
            onClick={() => setOpenCheckInModal(false)}
            sx={{ color: '#94A3B8', '&:hover': { color: '#FFFFFF' } }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleQuickCheckIn}>
          <DialogContent sx={{ p: 3 }}>
            <Stack spacing={2.5}>
              <TextField
                select
                fullWidth
                label="Select Member"
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                required
                size="small"
              >
                {members.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.name} ({m.plan} - {m.id})
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="Designated Workout Zone"
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                size="small"
              >
                {ZONES.map((zone) => (
                  <MenuItem key={zone} value={zone}>
                    {zone}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderTop: '1px solid #E6E8EC' }}>
            <Button
              variant="outlined"
              onClick={() => setOpenCheckInModal(false)}
              sx={{ borderColor: '#CBD5E1', color: '#475569' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#B7F34A',
                color: '#171A1F',
                fontWeight: 700,
                '&:hover': { backgroundColor: '#A3E337' },
              }}
            >
              Confirm Check-in
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
export default Attendance;
