import React, { useState } from 'react';
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
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  IconButton,
} from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { useGym } from '../context/GymContext';

export const Profile = () => {
  const { userProfile, setUserProfile } = useGym();

  const [formData, setFormData] = useState({ ...userProfile });
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleToggleNotification = (key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: e.target.checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    setSuccessMsg('Profile settings updated successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.02em' }}>
            Club & Administrator Profile
          </Typography>
          <Chip
            label="Super Admin"
            size="small"
            sx={{
              backgroundColor: '#171A1F',
              color: '#B7F34A',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: '#64748B' }}>
          Manage your fitness center business details, manager credentials, and automated alerts.
        </Typography>
      </Box>

      {successMsg && (
        <Alert
          icon={<CheckCircleRoundedIcon fontSize="inherit" />}
          severity="success"
          sx={{ mb: 3, borderRadius: '12px' }}
        >
          {successMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
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
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Avatar
                src={formData.avatar}
                alt={formData.name}
                sx={{
                  width: 84,
                  height: 84,
                  borderRadius: '18px',
                  border: '3px solid #171A1F',
                }}
              />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#171A1F', mb: 0.5 }}>
                  {formData.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', mb: 1 }}>
                  {formData.role} • {formData.email}
                </Typography>
                <Chip
                  label={formData.gymName}
                  size="small"
                  sx={{
                    backgroundColor: '#F1F5F9',
                    color: '#171A1F',
                    fontWeight: 700,
                  }}
                />
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              sx={{
                backgroundColor: '#B7F34A',
                color: '#171A1F',
                fontWeight: 700,
                py: 1.2,
                px: 3,
                borderRadius: '10px',
                boxShadow: '0 4px 14px rgba(183, 243, 74, 0.35)',
                '&:hover': {
                  backgroundColor: '#A3E337',
                  boxShadow: '0 6px 20px rgba(183, 243, 74, 0.45)',
                },
              }}
            >
              Save Profile Changes
            </Button>
          </Box>
        </Card>

        {/* Section 1: Administrator Information */}
        <Card
          sx={{
            borderRadius: '16px',
            border: '1px solid #E6E8EC',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            p: 3,
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
            <PersonRoundedIcon sx={{ color: '#171A1F', fontSize: 22 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
              Manager Details
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={handleChange('name')}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Official Email"
                value={formData.email}
                onChange={handleChange('email')}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Direct Phone"
                value={formData.phone}
                onChange={handleChange('phone')}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Avatar Image URL"
                value={formData.avatar}
                onChange={handleChange('avatar')}
                size="small"
              />
            </Grid>
          </Grid>
        </Card>

        {/* Section 2: Gym & Club Center Information */}
        <Card
          sx={{
            borderRadius: '16px',
            border: '1px solid #E6E8EC',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            p: 3,
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
            <BusinessRoundedIcon sx={{ color: '#171A1F', fontSize: 22 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
              Gym Club Details & Facility Information
            </Typography>
          </Box>

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gym Brand Name"
                value={formData.gymName}
                onChange={handleChange('gymName')}
                size="small"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Maximum Facility Floor Capacity"
                value={formData.capacity}
                onChange={handleChange('capacity')}
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Facility Physical Address"
                value={formData.location}
                onChange={handleChange('location')}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Operating Hours"
                value={formData.operatingHours}
                onChange={handleChange('operatingHours')}
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Currency Standard"
                value={formData.currency}
                onChange={handleChange('currency')}
                size="small"
              />
            </Grid>
          </Grid>
        </Card>

        {/* Section 3: Notification Alerts */}
        <Card
          sx={{
            borderRadius: '16px',
            border: '1px solid #E6E8EC',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            p: 3,
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2.5 }}>
            <NotificationsActiveRoundedIcon sx={{ color: '#171A1F', fontSize: 22 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
              Automated Alerts & Digest
            </Typography>
          </Box>

          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#171A1F' }}>
                  Member Expiry Triggers
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Receive daily warnings for memberships expiring within 14 days
                </Typography>
              </Box>
              <Switch
                checked={Boolean(formData.notifications?.memberExpiryAlert)}
                onChange={handleToggleNotification('memberExpiryAlert')}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#171A1F' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#B7F34A' },
                }}
              />
            </Box>

            <Divider sx={{ borderColor: '#F1F5F9' }} />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#171A1F' }}>
                  Daily Attendance Floor Summary
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Send automated midnight check-in count and peak usage report
                </Typography>
              </Box>
              <Switch
                checked={Boolean(formData.notifications?.dailyAttendanceReport)}
                onChange={handleToggleNotification('dailyAttendanceReport')}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#171A1F' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#B7F34A' },
                }}
              />
            </Box>

            <Divider sx={{ borderColor: '#F1F5F9' }} />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#171A1F' }}>
                  Revenue Milestones
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Notify whenever monthly membership billing passes targets
                </Typography>
              </Box>
              <Switch
                checked={Boolean(formData.notifications?.revenueMilestones)}
                onChange={handleToggleNotification('revenueMilestones')}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#171A1F' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#B7F34A' },
                }}
              />
            </Box>
          </Stack>
        </Card>

        {/* Bottom Save Action */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveRoundedIcon />}
            sx={{
              backgroundColor: '#B7F34A',
              color: '#171A1F',
              fontWeight: 700,
              py: 1.3,
              px: 4,
              borderRadius: '10px',
              boxShadow: '0 4px 14px rgba(183, 243, 74, 0.35)',
              '&:hover': {
                backgroundColor: '#A3E337',
                boxShadow: '0 6px 20px rgba(183, 243, 74, 0.45)',
              },
            }}
          >
            Save All Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default Profile;
