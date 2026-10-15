import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Box,
  Typography,
  IconButton,
  Avatar,
  Divider,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import ContactEmergencyRoundedIcon from '@mui/icons-material/ContactEmergencyRounded';
import { useGym } from '../context/GymContext';

const DEFAULT_STATE = {
  name: '',
  email: '',
  phone: '',
  plan: 'Pro Fitness',
  status: 'Active',
  assignedTrainer: 'Alex Rivera',
  gender: 'Male',
  age: '28',
  weight: '75 kg',
  height: '178 cm',
  joinDate: new Date().toISOString().split('T')[0],
  expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  emergencyContact: '',
  address: '',
  avatar: '',
};

export const MemberForm = ({ open, onClose, memberToEdit = null, onSaved = null }) => {
  const { addMember, updateMember, memberships, trainers } = useGym();
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (memberToEdit) {
      setFormData({
        ...DEFAULT_STATE,
        ...memberToEdit,
      });
    } else {
      setFormData(DEFAULT_STATE);
    }
    setErrors({});
  }, [memberToEdit, open]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.plan) newErrors.plan = 'Please select a membership plan';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (memberToEdit) {
      updateMember(memberToEdit.id, formData);
      if (onSaved) onSaved({ ...memberToEdit, ...formData });
    } else {
      const created = addMember(formData);
      if (onSaved) onSaved(created);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 24px 48px rgba(23, 26, 31, 0.16)',
          overflow: 'hidden',
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          backgroundColor: '#171A1F',
          color: '#FFFFFF',
          px: 3,
          py: 2.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              backgroundColor: '#B7F34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FitnessCenterRoundedIcon sx={{ color: '#171A1F', fontSize: 20 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF' }}>
              {memberToEdit ? `Edit Member: ${memberToEdit.name}` : 'Register New Gym Member'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8' }}>
              {memberToEdit ? `Updating ID ${memberToEdit.id}` : 'Fill in the information below to enroll a member'}
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={onClose}
          sx={{
            color: '#94A3B8',
            '&:hover': { color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 }, backgroundColor: '#FFFFFF' }}>
          {/* Section 1: Basic Information */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PersonRoundedIcon sx={{ color: '#171A1F', fontSize: 20 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#171A1F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Personal Information
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={handleChange('name')}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  size="small"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  placeholder="marcus@example.com"
                  value={formData.email}
                  onChange={handleChange('email')}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  size="small"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                  size="small"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Gender"
                  value={formData.gender}
                  onChange={handleChange('gender')}
                  size="small"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Non-binary">Non-binary</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange('age')}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Avatar URL (Optional)"
                  placeholder="https://..."
                  value={formData.avatar}
                  onChange={handleChange('avatar')}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Residential Address"
                  placeholder="Street, City, Zip"
                  value={formData.address}
                  onChange={handleChange('address')}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3, borderColor: '#F1F5F9' }} />

          {/* Section 2: Membership & Training */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <FitnessCenterRoundedIcon sx={{ color: '#171A1F', fontSize: 20 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#171A1F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Membership & Coaching
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Membership Plan"
                  value={formData.plan}
                  onChange={handleChange('plan')}
                  error={Boolean(errors.plan)}
                  helperText={errors.plan}
                  size="small"
                  required
                >
                  {memberships.map((plan) => (
                    <MenuItem key={plan.id} value={plan.name}>
                      {plan.name} (${plan.price}/mo)
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Assigned Trainer"
                  value={formData.assignedTrainer}
                  onChange={handleChange('assignedTrainer')}
                  size="small"
                >
                  <MenuItem value="None Assigned">None Assigned</MenuItem>
                  {trainers.map((t) => (
                    <MenuItem key={t.id} value={t.name}>
                      {t.name} ({t.specialization})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  select
                  label="Membership Status"
                  value={formData.status}
                  onChange={handleChange('status')}
                  size="small"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Expiring">Expiring Soon</MenuItem>
                  <MenuItem value="Inactive">Inactive / Suspended</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Join Date"
                  type="date"
                  value={formData.joinDate}
                  onChange={handleChange('joinDate')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange('expiryDate')}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3, borderColor: '#F1F5F9' }} />

          {/* Section 3: Physical & Emergency Details */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ContactEmergencyRoundedIcon sx={{ color: '#171A1F', fontSize: 20 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#171A1F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Health & Emergency Contact
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Body Weight"
                  placeholder="e.g. 78 kg"
                  value={formData.weight}
                  onChange={handleChange('weight')}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Height"
                  placeholder="e.g. 182 cm"
                  value={formData.height}
                  onChange={handleChange('height')}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Emergency Contact"
                  placeholder="+1 (555) 999-0000 (Relationship)"
                  value={formData.emergencyContact}
                  onChange={handleChange('emergencyContact')}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            py: 2,
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E6E8EC',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: '#CBD5E1',
              color: '#475569',
              borderRadius: '10px',
              px: 2.5,
              '&:hover': { borderColor: '#94A3B8', backgroundColor: '#F1F5F9' },
            }}
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
              px: 3.5,
              borderRadius: '10px',
              boxShadow: '0 4px 14px rgba(183, 243, 74, 0.35)',
              '&:hover': {
                backgroundColor: '#A3E337',
                boxShadow: '0 6px 18px rgba(183, 243, 74, 0.45)',
              },
            }}
          >
            {memberToEdit ? 'Save Changes' : 'Confirm Registration'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default MemberForm;
