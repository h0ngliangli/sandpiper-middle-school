'use client';
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const ThemeIndicator: React.FC = () => {
  const { theme } = useTheme();
  return theme === 'dark'
    ? <Moon className="h-3 w-3" />
    : <Sun className="h-3 w-3" />;
};

export default ThemeIndicator;
