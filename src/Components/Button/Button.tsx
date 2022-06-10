import MuiButton from '@mui/material/Button';
import React from 'react';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant?: 'contained' | 'outlined' | 'text';
  /**
   * What color to use
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | "warning" | "inherit" | undefined;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export default function Button({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  label = 'ارسال',
  ...props
}: ButtonProps) {
  return (
    <MuiButton variant={variant} size={size} color={color} {...props}>
      {label}
    </MuiButton>
  );
}
