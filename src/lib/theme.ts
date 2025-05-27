// Unified Design System for Muscat Bay
export const MUSCAT_BAY_THEME = {
  // Primary Colors - Based on Muscat Bay Branding
  colors: {
    primary: {
      50: '#f5f5f7',
      100: '#e8e8eb',
      200: '#d1d1d7',
      300: '#b5b5bd',
      400: '#92929a',
      500: '#4E4456', // Main brand color
      600: '#3B3241',
      700: '#2d252f',
      800: '#1f1a21',
      900: '#121016',
    },
    secondary: {
      50: '#f0fdff',
      100: '#cdf9ff',
      200: '#a1f2ff',
      300: '#60e7ff',
      400: '#1dd4f0',
      500: '#8ED2D6', // Accent teal
      600: '#6bb8bc',
      700: '#589499',
      800: '#4a797d',
      900: '#3f6569',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: {
      500: '#10b981',
      600: '#059669',
    },
    warning: {
      500: '#f59e0b',
      600: '#d97706',
    },
    error: {
      500: '#ef4444',
      600: '#dc2626',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  // Chart Colors (consistent across all dashboards)
  charts: {
    primary: ['#4E4456', '#8ED2D6', '#6A5F7A', '#B5E4E7', '#7E708A', '#DCDADF'],
    categorical: ['#4E4456', '#8ED2D6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'],
    gradients: {
      primary: 'linear-gradient(135deg, #4E4456 0%, #8ED2D6 100%)',
      secondary: 'linear-gradient(135deg, #8ED2D6 0%, #B5E4E7 100%)',
    },
  },
  
  // Layout
  layout: {
    sidebarWidth: {
      collapsed: '4rem',
      expanded: '16rem',
    },
    headerHeight: '4rem',
    maxWidth: '1440px',
  },
} as const;

// Utility functions
export const getThemeColor = (path: string) => {
  const keys = path.split('.');
  let current: any = MUSCAT_BAY_THEME.colors;
  
  for (const key of keys) {
    current = current[key];
    if (!current) return undefined;
  }
  
  return current;
};

export const getChartColors = (count: number = 6) => {
  return MUSCAT_BAY_THEME.charts.primary.slice(0, count);
};
