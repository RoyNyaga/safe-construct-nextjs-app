'use client'

import { createTheme, alpha } from '@mui/material/styles'

// ─── Brand Palette ──────────────────────────────────────────────────────────
// Primary: Construction Orange #F26419
// Accent:  Golden Amber       #F6AE2D
// Background: Dark Charcoal   #121824
// Surface:    Slate            #1E2635 / #252D3D
// ─────────────────────────────────────────────────────────────────────────────

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#F26419',
      light: '#F7824A',
      dark: '#C44E10',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F6AE2D',
      light: '#F9C55E',
      dark: '#C48B1A',
      contrastText: '#121824',
    },
    background: {
      default: '#121824',
      paper: '#1E2635',
    },
    text: {
      primary: '#F0F2F5',
      secondary: '#9AA3B2',
    },
    divider: alpha('#F0F2F5', 0.08),
    error: {
      main: '#EF5350',
    },
    success: {
      main: '#66BB6A',
    },
    info: {
      main: '#42A5F5',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    h1: {
      fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontSize: 'clamp(1.35rem, 2.5vw, 1.875rem)',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.35,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: '0.04em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E2635',
          backgroundImage: 'none',
          borderRadius: 16,
          border: `1px solid ${alpha('#F0F2F5', 0.06)}`,
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            borderColor: alpha('#F26419', 0.3),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '& fieldset': {
              borderColor: alpha('#F0F2F5', 0.15),
            },
            '&:hover fieldset': {
              borderColor: alpha('#F26419', 0.5),
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F26419',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E2635',
          backgroundImage: 'none',
          borderRadius: 20,
          border: `1px solid ${alpha('#F0F2F5', 0.1)}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E2635',
          backgroundImage: 'none',
          borderRight: `1px solid ${alpha('#F0F2F5', 0.08)}`,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#252D3D',
          border: `1px solid ${alpha('#F0F2F5', 0.15)}`,
          borderRadius: 8,
          fontSize: '0.8125rem',
          padding: '8px 12px',
        },
        arrow: {
          color: '#252D3D',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: alpha('#F26419', 0.15),
        },
        bar: {
          borderRadius: 8,
          background: 'linear-gradient(90deg, #F26419, #F6AE2D)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${alpha('#F26419', 0.3)} transparent`,
        },
        '*::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          background: alpha('#F26419', 0.3),
          borderRadius: '3px',
          '&:hover': {
            background: alpha('#F26419', 0.5),
          },
        },
        'html, body': {
          backgroundColor: '#121824',
          color: '#F0F2F5',
        },
        '::selection': {
          backgroundColor: alpha('#F26419', 0.3),
          color: '#F0F2F5',
        },
      },
    },
  },
})

export default theme
