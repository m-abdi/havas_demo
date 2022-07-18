import React, { memo } from 'react';

import MuiButton from '@mui/material/Button';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant?: 'contained' | 'outlined' | 'text';
  /**
   * What color to use
   */
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit'
    | undefined;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Button state
   */
  disabled?: boolean;
  /**
   * unique id of element in dom
   */
  id?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  startIcon?: any;
  backgroundColor?: string;
}

/**
 * Primary UI component for user interaction
 */
export default memo(function Button({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  label = 'ارسال',
  disabled = false,
  backgroundColor,
  startIcon,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      type='submit'
      variant={variant}
      size={size}
      color={color}
      disabled={disabled}
      {...props}
      sx={{ borderRadius: '13px', backgroundColor}}
      startIcon={startIcon}
    >
      {label}
    </MuiButton>
  );
});
