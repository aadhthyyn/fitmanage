import React, { useState } from 'react';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { useGym } from '../context/GymContext';

export const Trainers = () => {
  const { trainers } = useGym();
  const [trainerList, setTrainerList] = useState(trainers);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [newTrainer, setNewTrainer] = useState({
    name: '',
    role: 'Certified Personal Trainer',
    specialization: 'Strength & Conditioning',
    rating: 4.9,
    reviewsCount: 12,
    activeClients: 10,
    experience: '4 Years',
    phone: '',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=250&q=80',
    status: 'Available',
    bio: '',
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTrainer.name.trim()) return;

    const created = {
      ...newTrainer,
      id: `TRN-${Date.now().toString().slice(-4)}`,
    };
    setTrainerList((prev) => [created, ...prev]);
    setOpenAddModal(false);
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
              Gym Trainers & Performance Coaches
            </Typography>
            <Chip
              label={`${trainerList.length} Active Coaches`}
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
            Meet our certified personal trainers, track active client rosters, and manage coaching specialties.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonAddAlt1RoundedIcon />}
          onClick={() => setOpenAddModal(true)}
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
              boxShadow: '0 6px 18px rgba(183, 243, 74, 0.45)',
            },
          }}
        >
          Add New Trainer
        </Button>
      </Box>

      {/* Trainers Cards Grid */}
      <Grid container spacing={3}>
        {trainerList.map((trainer) => {
          const isAvailable = trainer.status === 'Available';

          return (
            <Grid item xs={12} sm={6} lg={4} key={trainer.id}>
              <Card
                sx={{
                  borderRadius: '20px',
                  border: '1px solid #E6E8EC',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 14px 32px rgba(23, 26, 31, 0.06)',
                    borderColor: '#CBD5E1',
                  },
                }}
              >
                <Box>
                  {/* Top Bar: Status Chip & Experience */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                    <Chip
                      label={trainer.status}
                      size="small"
                      sx={{
                        backgroundColor: isAvailable ? '#DCFCE7' : '#FEF3C7',
                        color: isAvailable ? '#15803D' : '#B45309',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                      }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <StarRoundedIcon sx={{ color: '#EAB308', fontSize: 18 }} />
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#171A1F' }}>
                        {trainer.rating}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>
                        ({trainer.reviewsCount})
                      </Typography>
                    </Box>
                  </Box>

                  {/* Avatar & Trainer Info */}
                  <Box sx={{ textAlign: 'center', mb: 2.5 }}>
                    <Avatar
                      src={trainer.avatar}
                      alt={trainer.name}
                      sx={{
                        width: 90,
                        height: 90,
                        mx: 'auto',
                        mb: 1.8,
                        borderRadius: '20px',
                        border: '3px solid #F1F5F9',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.02em', mb: 0.5 }}
                    >
                      {trainer.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block', mb: 1 }}>
                      {trainer.role}
                    </Typography>

                    <Chip
                      icon={<WorkspacePremiumRoundedIcon sx={{ fontSize: '15px !important' }} />}
                      label={trainer.specialization}
                      size="small"
                      sx={{
                        backgroundColor: '#171A1F',
                        color: '#B7F34A',
                        fontWeight: 700,
                        fontSize: '0.72rem',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#64748B',
                      fontSize: '0.85rem',
                      lineHeight: 1.5,
                      textAlign: 'center',
                      mb: 3,
                      minHeight: 40,
                    }}
                  >
                    {trainer.bio || 'Expert athletic conditioning and functional hypertrophy specialist.'}
                  </Typography>

                  {/* Metrics Box */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      p: 1.8,
                      borderRadius: '14px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      mb: 3,
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block' }}>
                        Active Clients
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
                        {trainer.activeClients}
                      </Typography>
                    </Box>

                    <Divider orientation="vertical" flexItem sx={{ borderColor: '#E2E8F0' }} />

                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block' }}>
                        Experience
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
                        {trainer.experience}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Contact Footer */}
                <Box sx={{ pt: 2, borderTop: '1px solid #F1F5F9' }}>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<EmailRoundedIcon />}
                      href={`mailto:${trainer.email}`}
                      sx={{
                        borderColor: '#E2E8F0',
                        color: '#171A1F',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        '&:hover': { borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' },
                      }}
                    >
                      Email
                    </Button>

                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<PhoneRoundedIcon />}
                      href={`tel:${trainer.phone}`}
                      sx={{
                        borderColor: '#E2E8F0',
                        color: '#171A1F',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        '&:hover': { borderColor: '#CBD5E1', backgroundColor: '#F8FAFC' },
                      }}
                    >
                      Call
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Add Trainer Dialog */}
      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        maxWidth="sm"
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
            Register New Coach / Trainer
          </Typography>
          <IconButton
            onClick={() => setOpenAddModal(false)}
            sx={{ color: '#94A3B8', '&:hover': { color: '#FFFFFF' } }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleAddSubmit}>
          <DialogContent sx={{ p: 3 }}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Trainer Full Name"
                value={newTrainer.name}
                onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                required
                size="small"
              />
              <TextField
                fullWidth
                label="Specialization / Title"
                value={newTrainer.specialization}
                onChange={(e) => setNewTrainer({ ...newTrainer, specialization: e.target.value })}
                size="small"
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={newTrainer.phone}
                    onChange={(e) => setNewTrainer({ ...newTrainer, phone: e.target.value })}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={newTrainer.email}
                    onChange={(e) => setNewTrainer({ ...newTrainer, email: e.target.value })}
                    size="small"
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Short Bio"
                multiline
                rows={2}
                value={newTrainer.bio}
                onChange={(e) => setNewTrainer({ ...newTrainer, bio: e.target.value })}
                size="small"
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderTop: '1px solid #E6E8EC' }}>
            <Button
              variant="outlined"
              onClick={() => setOpenAddModal(false)}
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
              Save Trainer
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};
export default Trainers;
