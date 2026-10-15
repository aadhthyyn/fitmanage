import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#171A1F',
      contrastText: '#FFFFFF',
      light: '#2E333D',
      dark: '#0C0E11',
    },
    secondary: {
      main: '#B7F34A',
      contrastText: '#171A1F',
      light: '#CBF776',
      dark: '#9FE02E',
    },
    background: {
      default: '#F7F8FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#171A1F',
      secondary: '#64748B',
    },
    divider: '#E6E8EC',
    success: {
      main: '#16A34A',
      light: '#DCFCE7',
      dark: '#15803D',
    },
    warning: {
      main: '#EA580C',
      light: '#FFEDD5',
      dark: '#C2410C',
    },
    error: {
      main: '#DC2626',
      light: '#FEE2E2',
      dark: '#B91C1C',
    },
    info: {
      main: '#0284C7',
      light: '#E0F2FE',
      dark: '#0369A1',
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
      color: '#171A1F',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
      color: '#171A1F',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#171A1F',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#171A1F',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: '#171A1F',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: '#171A1F',
    },
    subtitle1: {
      fontWeight: 500,
      color: '#64748B',
    },
    subtitle2: {
      fontWeight: 500,
      color: '#64748B',
    },
    body1: {
      color: '#171A1F',
      fontSize: '0.9375rem',
      lineHeight: 1.5,
    },
    body2: {
      color: '#64748B',
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 18px',
          fontSize: '0.875rem',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#171A1F',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#2A2F38',
          },
        },
        containedSecondary: {
          backgroundColor: '#B7F34A',
          color: '#171A1F',
          '&:hover': {
            backgroundColor: '#A2E234',
            boxShadow: '0 4px 14px rgba(183, 243, 74, 0.38)',
          },
        },
        outlined: {
          borderColor: '#E2E8F0',
          color: '#171A1F',
          '&:hover': {
            borderColor: '#CBD5E1',
            backgroundColor: '#F8FAFC',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: '1px solid #EAEAEA',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
          backgroundColor: '#FFFFFF',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 14,
        },
        elevation1: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          border: '1px solid #EAEAEA',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 26,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E2E8F0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CBD5E1',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#171A1F',
            borderWidth: '1.5px',
          },
        },
        input: {
          fontSize: '0.875rem',
          padding: '10px 14px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#F8FAFC',
          '& .MuiTableCell-head': {
            color: '#64748B',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '1px solid #E2E8F0',
            padding: '12px 16px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          fontSize: '0.875rem',
          borderBottom: '1px solid #F1F5F9',
          padding: '14px 16px',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: '#F8FAFC !important',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});
