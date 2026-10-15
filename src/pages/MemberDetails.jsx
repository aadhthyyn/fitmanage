import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SportsGymnasticsRoundedIcon from '@mui/icons-material/SportsGymnasticsRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import MemberForm from '../components/MemberForm';
import DeleteConfirm from '../components/DeleteConfirm';
import { useGym } from '../context/GymContext';

export const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMemberById, deleteMember, updateMember, trainers, attendance } = useGym();

  const member = getMemberById(id);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  if (!member) {
    return (
      <Box sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
          Member Not Found
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
          The requested member identifier does not exist in the database.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/members')}
          sx={{ backgroundColor: '#171A1F' }}
        >
          Return to Members Directory
        </Button>
      </Box>
    );
  }

  const assignedTrainerObj = trainers.find((t) => t.name === member.assignedTrainer);
  const memberAttendance = attendance.filter((a) => a.memberId === member.id);

  const handleRenewPlan = () => {
    updateMember(member.id, {
      status: 'Active',
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  const handleDeleteConfirm = () => {
    deleteMember(member.id);
    navigate('/members');
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Breadcrumb Navigation */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs
          separator={<NavigateNextRoundedIcon sx={{ fontSize: 16, color: '#94A3B8' }} />}
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#64748B',
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            onClick={() => navigate('/members')}
          >
            <ArrowBackRoundedIcon sx={{ mr: 0.8, fontSize: 18 }} />
            Member Directory
          </Link>
          <Typography sx={{ color: '#171A1F', fontWeight: 700, fontSize: '0.85rem' }}>
            {member.name}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Top Profile Card Banner */}
      <Card
        sx={{
          borderRadius: '20px',
          border: '1px solid #E6E8EC',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
          p: { xs: 2.5, sm: 3.5 },
          mb: 4,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
          }}
        >
          {/* Avatar and Main Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
            <Avatar
              src={member.avatar}
              alt={member.name}
              sx={{
                width: { xs: 72, sm: 88 },
                height: { xs: 72, sm: 88 },
                borderRadius: '18px',
                border: '3px solid #F1F5F9',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              }}
            />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.8 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.02em' }}>
                  {member.name}
                </Typography>
                <Chip
                  label={member.id}
                  size="small"
                  sx={{
                    backgroundColor: '#171A1F',
                    color: '#B7F34A',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                  }}
                />
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
                    fontSize: '0.75rem',
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ color: '#64748B' }}>
                Enrolled since {member.joinDate} • Current Plan: <strong>{member.plan}</strong>
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', md: 'auto' } }}>
            <Button
              variant="outlined"
              startIcon={<AutorenewRoundedIcon />}
              onClick={handleRenewPlan}
              sx={{
                borderColor: '#E2E8F0',
                color: '#171A1F',
                borderRadius: '10px',
                py: 1,
                '&:hover': { borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' },
              }}
            >
              Extend Membership
            </Button>

            <Button
              variant="contained"
              startIcon={<EditRoundedIcon />}
              onClick={() => setOpenEditModal(true)}
              sx={{
                backgroundColor: '#171A1F',
                color: '#FFFFFF',
                borderRadius: '10px',
                py: 1,
                px: 2.2,
                '&:hover': { backgroundColor: '#2E333D' },
              }}
            >
              Edit Details
            </Button>

            <IconButton
              onClick={() => setOpenDeleteModal(true)}
              sx={{
                color: '#94A3B8',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                '&:hover': { color: '#DC2626', backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' },
              }}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* 4 Mini Stat Metrics */}
        <Grid container spacing={2} sx={{ mt: 3, pt: 3, borderTop: '1px solid #F1F5F9' }}>
          <Grid item xs={6} sm={3}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Attendance Rate
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#15803D' }}>
              {member.attendanceRate || '92%'}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Body Weight
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
              {member.weight || '78 kg'}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Height
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
              {member.height || '180 cm'}
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Plan Expiry
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: member.status === 'Expiring' ? '#EA580C' : '#171A1F',
              }}
            >
              {member.expiryDate}
            </Typography>
          </Grid>
        </Grid>
      </Card>

      {/* Grid: Details & Trainer */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Contact and Bio Details */}
        <Grid item xs={12} md={7}>
          <Card
            sx={{
              p: 3,
              borderRadius: '16px',
              border: '1px solid #E6E8EC',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
              height: '100%',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F', mb: 2.5 }}>
              Member Information
            </Typography>

            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <EmailRoundedIcon sx={{ color: '#64748B', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                      Email Address
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#171A1F' }}>
                      {member.email}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <PhoneRoundedIcon sx={{ color: '#64748B', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                      Phone Number
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#171A1F' }}>
                      {member.phone}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <HomeRoundedIcon sx={{ color: '#64748B', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                      Residential Address
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#171A1F' }}>
                      {member.address || '742 Broadway Ave, Suite 2B'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <ContactPhoneRoundedIcon sx={{ color: '#64748B', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                      Emergency Contact
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#171A1F' }}>
                      {member.emergencyContact || '+1 (555) 998-1122 (Partner)'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3, borderColor: '#F1F5F9' }} />

            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#171A1F', mb: 1 }}>
                Membership Privileges
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                Active tier encompasses all standard fitness equipment, recovery facilities, lockers, and priority coach booking reservations.
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Assigned Trainer Card */}
        <Grid item xs={12} md={5}>
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
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
                  Assigned Coach
                </Typography>
                <Chip
                  label="1-on-1 PT"
                  size="small"
                  sx={{
                    backgroundColor: '#B7F34A',
                    color: '#171A1F',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                  }}
                />
              </Box>

              {assignedTrainerObj ? (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Avatar
                    src={assignedTrainerObj.avatar}
                    alt={assignedTrainerObj.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 1.5,
                      borderRadius: '16px',
                      border: '2px solid #171A1F',
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
                    {assignedTrainerObj.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', mb: 1.5 }}>
                    {assignedTrainerObj.specialization}
                  </Typography>
                  <Chip
                    label={`★ ${assignedTrainerObj.rating} Rating • ${assignedTrainerObj.experience}`}
                    size="small"
                    sx={{
                      backgroundColor: '#F1F5F9',
                      color: '#171A1F',
                      fontWeight: 700,
                    }}
                  />
                </Box>
              ) : (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                  <SportsGymnasticsRoundedIcon sx={{ fontSize: 48, color: '#CBD5E1', mb: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#171A1F' }}>
                    {member.assignedTrainer}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    You can assign a personal coach through the edit dialog.
                  </Typography>
                </Box>
              )}
            </Box>

            <Button
              variant="outlined"
              onClick={() => navigate('/trainers')}
              sx={{
                borderColor: '#E2E8F0',
                color: '#171A1F',
                borderRadius: '10px',
                py: 1,
                mt: 2,
                '&:hover': { borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' },
              }}
            >
              Browse All Gym Trainers
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Attendance & Check-in History */}
      <Card
        sx={{
          borderRadius: '16px',
          border: '1px solid #E6E8EC',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
          p: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F', mb: 0.5 }}>
          Turnstile & Session History
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5 }}>
          Recent check-in records for {member.name}
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Session Date</TableCell>
                <TableCell>Check-in Time</TableCell>
                <TableCell>Check-out Time</TableCell>
                <TableCell>Workout Zone</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberAttendance.length > 0 ? (
                memberAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell sx={{ fontWeight: 600 }}>{record.date}</TableCell>
                    <TableCell>{record.checkInTime}</TableCell>
                    <TableCell>{record.checkOutTime}</TableCell>
                    <TableCell>{record.zone}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={record.status}
                        size="small"
                        sx={{
                          backgroundColor: record.status === 'Present' ? '#DCFCE7' : '#FEE2E2',
                          color: record.status === 'Present' ? '#15803D' : '#B91C1C',
                          fontWeight: 700,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4, color: '#64748B' }}>
                    No recent check-in logs found for this member today.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Modals */}
      <MemberForm
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        memberToEdit={member}
      />

      <DeleteConfirm
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        memberName={member.name}
      />
    </Box>
  );
};
export default MemberDetails;
