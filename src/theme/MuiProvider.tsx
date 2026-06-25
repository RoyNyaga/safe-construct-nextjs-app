'use client'

import { ThemeProvider, CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import theme from '@/theme/theme'

interface MuiProviderProps {
  children: React.ReactNode
}

export default function MuiProvider({ children }: MuiProviderProps) {
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
