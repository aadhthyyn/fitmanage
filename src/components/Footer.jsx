import React from 'react';
import { Box, Typography, Stack, Link } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E6E8EC',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mt: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.82rem' }}>
          © {new Date().getFullYear()} <strong>FitManage</strong> – Gym Member Management System.
        </Typography>
      </Box>

      <Stack direction="row" spacing={3} alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <FiberManualRecordIcon sx={{ fontSize: 10, color: '#16A34A' }} />
          <Typography variant="caption" sx={{ color: '#15803D', fontWeight: 600 }}>
            Systems Operational
          </Typography>
        </Box>

        <Typography variant="caption" sx={{ color: '#94A3B8' }}>
          •
        </Typography>

        <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
          v2.4.0 SaaS
        </Typography>
      </Stack>
    </Box>
  );
};
export default Footer;
