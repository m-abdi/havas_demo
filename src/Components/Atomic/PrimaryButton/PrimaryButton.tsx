import { Box, Fab, Toolbar, useMediaQuery } from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button } from '../Button';
import React from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import isSmallScreen from '@/src/isSmallScreen';

export default function PrimaryButton({
  id,
  ariaLabel,
  size = 'large',
  disabled = false,
  icon,
  onClick,
  color,
  variant,
  fabVariant,
  label,
  right,
}: {
  id: string;
  icon: 'SEND' | 'ADD';
  ariaLabel: string;
  color: 'success' | 'error' | 'info';
  variant: 'contained' | 'outlined';
  fabVariant: 'circular' | 'extended';
  onClick?: any;
  label: string;
  right: any;
  disabled?: boolean;
  size?: 'small' | 'large' | 'medium';
}) {
  const match = isSmallScreen();
  return match ? (
    <>
      <Toolbar />
      <Fab
        id={id}
        color={color}
        aria-label='ایجاد'
        size={size}
        variant={fabVariant}
        type='submit'
        disabled={disabled}
        sx={{ position: 'fixed', bottom: 16, left: 16 }}
        onClick={onClick}
      >
        {icon === 'SEND' ? (
          <SendRoundedIcon sx={{ mr: 2 }} />
        ) : icon === 'ADD' ? (
          <AddRoundedIcon />
        ) : null}
        {fabVariant === 'extended' ? label : null}
      </Fab>
    </>
  ) : (
    <Box
      sx={{
        position: 'fixed',
        top: 72,
        right: right,
        zIndex: 40,
      }}
    >
      <Button
        id={id}
        label={label}
        size={size}
        color={color}
        variant='contained'
        onClick={onClick}
        disabled={disabled}
      />
    </Box>
  );
}
