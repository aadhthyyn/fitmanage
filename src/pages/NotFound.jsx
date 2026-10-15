import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Stack, Card } from '@mui/material';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 540,
          width: '100%',
          textAlign: 'center',
          p: { xs: 3, sm: 5 },
          borderRadius: '24px',
          border: '1px solid #E6E8EC',
          boxShadow: '0 12px 36px rgba(23, 26, 31, 0.05)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '20px',
            backgroundColor: '#171A1F',
            color: '#B7F34A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 3,
            boxShadow: '0 8px 24px rgba(23, 26, 31, 0.2)',
          }}
        >
          <FitnessCenterRoundedIcon sx={{ fontSize: 36 }} />
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '4.5rem', sm: '5.5rem' },
            color: '#171A1F',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            mb: 1,
          }}
        >
          4<span style={{ color: '#84CC16' }}>0</span>4
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 800, color: '#171A1F', mb: 1.5, letterSpacing: '-0.01em' }}>
          Page Not Found on the Floor
        </Typography>

        <Typography variant="body2" sx={{ color: '#64748B', mb: 4, lineHeight: 1.6, px: { xs: 0, sm: 2 } }}>
          The link or route you followed might have expired, or the designated member record has been relocated.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            startIcon={<HomeRoundedIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{
              backgroundColor: '#171A1F',
              color: '#FFFFFF',
              fontWeight: 700,
              py: 1.2,
              px: 3,
              borderRadius: '10px',
              '&:hover': {
                backgroundColor: '#2E333D',
              },
            }}
          >
            Dashboard
          </Button>

          <Button
            variant="outlined"
            startIcon={<PeopleAltRoundedIcon />}
            onClick={() => navigate('/members')}
            sx={{
              borderColor: '#CBD5E1',
              color: '#171A1F',
              fontWeight: 700,
              py: 1.2,
              px: 3,
              borderRadius: '10px',
              '&:hover': {
                borderColor: '#94A3B8',
                backgroundColor: '#F8FAFC',
              },
            }}
          >
            Members Directory
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};
export default NotFound;
