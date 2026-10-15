import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Stack,
  Chip,
  Alert,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { useGym } from '../context/GymContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useGym();

  const [email, setEmail] = useState('admin@fitmanage.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }
    login(email, password);
    navigate('/dashboard');
  };

  const handleFillDemo = () => {
    setEmail('admin@fitmanage.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        backgroundColor: '#F7F8FA',
      }}
    >
      {/* Left Branding Showcase (Visible on md and up) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: 1,
          backgroundColor: '#171A1F',
          color: '#FFFFFF',
          p: 6,
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative glow */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(183, 243, 74, 0.12) 0%, rgba(23, 26, 31, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Brand Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, zIndex: 1 }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: '12px',
              backgroundColor: '#B7F34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(183, 243, 74, 0.4)',
            }}
          >
            <FitnessCenterRoundedIcon sx={{ color: '#171A1F', fontSize: 26 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Fit<span style={{ color: '#B7F34A' }}>Manage</span>
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, letterSpacing: '0.05em' }}>
              Enterprise Gym Suite
            </Typography>
          </Box>
        </Box>

        {/* Center Hero Copy & Stats */}
        <Box sx={{ zIndex: 1, my: 'auto', maxWidth: 480 }}>
          <Chip
            icon={<BoltRoundedIcon sx={{ color: '#171A1F !important', fontSize: '16px !important' }} />}
            label="Version 2.4.0 SaaS Engine"
            sx={{
              backgroundColor: '#B7F34A',
              color: '#171A1F',
              fontWeight: 700,
              fontSize: '0.75rem',
              mb: 3,
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Command Your Gym Operations with Pure Precision.
          </Typography>

          <Typography variant="body1" sx={{ color: '#94A3B8', fontSize: '1.05rem', mb: 4, lineHeight: 1.6 }}>
            Track members, memberships, attendance, and certified trainers all in one cohesive dashboard.
          </Typography>

          <Stack spacing={2}>
            {[
              'Real-time live attendance & floor capacity',
              'Automated membership renewal & expiry triggers',
              'Integrated personal trainer roster & client logs',
            ].map((feature, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircleRoundedIcon sx={{ color: '#B7F34A', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 500 }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Bottom Social Proof */}
        <Box
          sx={{
            zIndex: 1,
            p: 2.5,
            borderRadius: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', fontWeight: 600 }}>
              Active Floor Members
            </Typography>
            <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 800 }}>
              1,284 Members
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', fontWeight: 600 }}>
              Retention Rate
            </Typography>
            <Typography variant="h6" sx={{ color: '#B7F34A', fontWeight: 800 }}>
              98.4%
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Login Form */}
      <Box
        sx={{
          flex: { xs: 1, md: 0.9 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 6 },
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 440,
            borderRadius: '20px',
            border: '1px solid #E6E8EC',
            boxShadow: '0 12px 36px rgba(23, 26, 31, 0.06)',
            p: { xs: 2.5, sm: 4 },
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* Mobile Header Logo */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  backgroundColor: '#B7F34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FitnessCenterRoundedIcon sx={{ color: '#171A1F', fontSize: 22 }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#171A1F' }}>
                Fit<span style={{ color: '#16A34A' }}>Manage</span>
              </Typography>
            </Box>

            <Box sx={{ mb: 3.5 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#171A1F', letterSpacing: '-0.02em', mb: 0.8 }}>
                Welcome Back
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B' }}>
                Sign in with your administrator account to access the management portal.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: '10px' }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#171A1F', mb: 0.8, display: 'block' }}>
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="admin@fitmanage.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#171A1F' }}>
                      Password
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#64748B',
                        cursor: 'pointer',
                        fontWeight: 600,
                        '&:hover': { color: '#171A1F' },
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                            sx={{ color: '#94A3B8' }}
                          >
                            {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{
                          color: '#CBD5E1',
                          '&.Mui-checked': { color: '#171A1F' },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.85rem' }}>
                        Remember this session
                      </Typography>
                    }
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#B7F34A',
                    color: '#171A1F',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    py: 1.4,
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(183, 243, 74, 0.4)',
                    '&:hover': {
                      backgroundColor: '#A3E337',
                      boxShadow: '0 6px 20px rgba(183, 243, 74, 0.5)',
                    },
                  }}
                >
                  Sign In to Dashboard
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  fullWidth
                  onClick={handleFillDemo}
                  sx={{
                    borderColor: '#E2E8F0',
                    color: '#64748B',
                    fontWeight: 600,
                    py: 1,
                    borderRadius: '12px',
                    '&:hover': {
                      borderColor: '#CBD5E1',
                      backgroundColor: '#F8FAFC',
                      color: '#171A1F',
                    },
                  }}
                >
                  Quick Demo Sign-In
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #F1F5F9', textAlign: 'center' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: '#94A3B8' }}>
                <ShieldRoundedIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                  Protected by 256-bit SSL Gym Enterprise Encryption
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default Login;
