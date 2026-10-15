import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import { useGym } from '../context/GymContext';

export const Memberships = () => {
  const { memberships, members } = useGym();

  const [plans, setPlans] = useState(memberships);
  const [selectedPlanToEdit, setSelectedPlanToEdit] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [editName, setEditName] = useState('');
  const [editDuration, setEditDuration] = useState('');

  const handleOpenEdit = (plan) => {
    setSelectedPlanToEdit(plan);
    setEditPrice(plan.price);
    setEditName(plan.name);
    setEditDuration(plan.duration);
  };

  const handleSaveEdit = () => {
    if (selectedPlanToEdit) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === selectedPlanToEdit.id
            ? { ...p, name: editName, price: Number(editPrice), duration: editDuration }
            : p
        )
      );
      setSelectedPlanToEdit(null);
    }
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
              Membership Plans & Pricing
            </Typography>
            <Chip
              label="4 Active Tiers"
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
            Configure gym tiers, perks, monthly fees, and subscription access controls.
          </Typography>
        </Box>
      </Box>

      {/* 4 Premium Cards Grid */}
      <Grid container spacing={3} alignItems="stretch">
        {plans.map((plan) => {
          const isPopular = plan.popular;

          return (
            <Grid item xs={12} sm={6} lg={3} key={plan.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '20px',
                  border: isPopular ? '2px solid #171A1F' : '1px solid #E6E8EC',
                  boxShadow: isPopular
                    ? '0 12px 32px rgba(23, 26, 31, 0.08)'
                    : '0 2px 10px rgba(0,0,0,0.02)',
                  backgroundColor: '#FFFFFF',
                  position: 'relative',
                  overflow: 'hidden',
                  p: 3,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 16px 36px rgba(23, 26, 31, 0.08)',
                    borderColor: isPopular ? '#171A1F' : '#CBD5E1',
                  },
                }}
              >
                {/* Popular Ribbon Tag */}
                {isPopular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 18,
                      right: 18,
                      backgroundColor: '#B7F34A',
                      color: '#171A1F',
                      fontWeight: 800,
                      fontSize: '0.7rem',
                      py: 0.4,
                      px: 1.2,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      boxShadow: '0 2px 8px rgba(183, 243, 74, 0.4)',
                    }}
                  >
                    <BoltRoundedIcon sx={{ fontSize: 14 }} />
                    MOST POPULAR
                  </Box>
                )}

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#64748B',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      display: 'block',
                      mb: 1,
                    }}
                  >
                    {plan.badge}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, color: '#171A1F', mb: 1, letterSpacing: '-0.01em' }}
                  >
                    {plan.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: '#64748B', fontSize: '0.82rem', mb: 3, minHeight: 40 }}
                  >
                    {plan.description}
                  </Typography>

                  {/* Price Tag */}
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.03em' }}
                    >
                      ${plan.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', ml: 0.8, fontWeight: 500 }}>
                      / month
                    </Typography>
                  </Box>

                  <Chip
                    label={`Term: ${plan.duration} Commitment`}
                    size="small"
                    sx={{
                      backgroundColor: '#F1F5F9',
                      color: '#334155',
                      fontWeight: 600,
                      fontSize: '0.72rem',
                      mb: 3,
                    }}
                  />

                  <Divider sx={{ mb: 3, borderColor: '#F1F5F9' }} />

                  {/* Feature Checklist */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#171A1F',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      display: 'block',
                      mb: 1.5,
                    }}
                  >
                    Included Amenities:
                  </Typography>

                  <Stack spacing={1.5} sx={{ mb: 3 }}>
                    {plan.features.map((feat, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                        <CheckCircleRoundedIcon
                          sx={{
                            color: isPopular ? '#15803D' : '#64748B',
                            fontSize: 18,
                            mt: 0.2,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#334155', fontSize: '0.82rem' }}>
                          {feat}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ pt: 2, borderTop: '1px solid #F1F5F9' }}>
                  <Button
                    fullWidth
                    variant={isPopular ? 'contained' : 'outlined'}
                    onClick={() => handleOpenEdit(plan)}
                    startIcon={<EditRoundedIcon sx={{ fontSize: '16px !important' }} />}
                    sx={{
                      py: 1.1,
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      backgroundColor: isPopular ? '#171A1F' : 'transparent',
                      color: isPopular ? '#B7F34A' : '#171A1F',
                      borderColor: '#E2E8F0',
                      '&:hover': {
                        backgroundColor: isPopular ? '#2A2F38' : '#F8FAFC',
                        borderColor: isPopular ? '#2A2F38' : '#CBD5E1',
                      },
                    }}
                  >
                    Edit Plan Settings
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Edit Plan Dialog */}
      <Dialog
        open={Boolean(selectedPlanToEdit)}
        onClose={() => setSelectedPlanToEdit(null)}
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
            Modify Plan: {selectedPlanToEdit?.name}
          </Typography>
          <IconButton
            onClick={() => setSelectedPlanToEdit(null)}
            sx={{ color: '#94A3B8', '&:hover': { color: '#FFFFFF' } }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3, pt: 3.5 }}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Plan Name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              size="small"
            />
            <TextField
              fullWidth
              label="Monthly Fee ($ USD)"
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              size="small"
            />
            <TextField
              fullWidth
              label="Duration Term"
              value={editDuration}
              onChange={(e) => setEditDuration(e.target.value)}
              size="small"
              placeholder="e.g. 1 Month, 3 Months, 12 Months"
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderTop: '1px solid #E6E8EC' }}>
          <Button
            variant="outlined"
            onClick={() => setSelectedPlanToEdit(null)}
            sx={{ borderColor: '#CBD5E1', color: '#475569' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            sx={{
              backgroundColor: '#B7F34A',
              color: '#171A1F',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#A3E337' },
            }}
          >
            Save Plan Updates
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Memberships;
