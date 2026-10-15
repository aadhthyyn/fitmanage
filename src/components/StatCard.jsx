import React from 'react';
import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  iconBg = 'rgba(183, 243, 74, 0.15)',
  iconColor = '#171A1F',
  trend = '+12%',
  trendPositive = true,
  trendLabel = 'vs last month',
  accentColor = '#B7F34A',
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: '16px',
        border: '1px solid #E6E8EC',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 12px 28px rgba(23, 26, 31, 0.06)',
          borderColor: '#CBD5E1',
          '& .top-accent-bar': {
            opacity: 1,
          },
        },
      }}
    >
      {/* Subtle top accent bar on hover */}
      <Box
        className="top-accent-bar"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: accentColor,
          opacity: 0,
          transition: 'opacity 0.25s ease',
        }}
      />

      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: '#64748B',
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: '#171A1F',
                fontSize: { xs: '1.6rem', sm: '1.9rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              backgroundColor: iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: iconColor,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          {trend && (
            <Chip
              icon={
                trendPositive ? (
                  <TrendingUpRoundedIcon sx={{ fontSize: '14px !important', color: '#15803D !important' }} />
                ) : (
                  <TrendingDownRoundedIcon sx={{ fontSize: '14px !important', color: '#B91C1C !important' }} />
                )
              }
              label={trend}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.72rem',
                fontWeight: 700,
                backgroundColor: trendPositive ? '#DCFCE7' : '#FEE2E2',
                color: trendPositive ? '#15803D' : '#B91C1C',
                px: 0.5,
                border: `1px solid ${trendPositive ? '#BBF7D0' : '#FECACA'}`,
              }}
            />
          )}
          <Typography variant="caption" sx={{ color: '#64748B', fontSize: '0.78rem' }}>
            {trendLabel || subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default StatCard;
