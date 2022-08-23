import { Box, Fab, Toolbar, useMediaQuery } from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button } from '../Button';
import React from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import isSmallScreen from '@/src/isSmallScreen';

export default function PAB({
  id,
  ariaLabel,
  icon,
  onClick,
  color,
  variant,
  label,
}: {
  id: string;
  icon: 'SEND' | 'ADD';
  ariaLabel: string;
  color: 'success' | 'error' | 'info';
  variant: 'circular' | 'extended';
  onClick?: any;
  label: string;
}) {
  const match = isSmallScreen();
  return match ? (
    <>
      <Toolbar />
      <Fab
        id={id}
        color='success'
        aria-label='ایجاد'
        size='large'
        variant={variant}
        type='submit'
        sx={{ position: 'fixed', bottom: 16, left: 16 }}
        onClick={onClick}
      >
        {icon === 'SEND' ? (
          <SendRoundedIcon sx={{ mr: 2 }} />
        ) : icon === 'ADD' ? (
          <AddRoundedIcon />
        ) : null}
        ارسال
      </Fab>
    </>
  ) : (
    <Box
      sx={{
        position: 'fixed',
        top: 72,
        right: 40,
        zIndex: 40,
      }}
    >
      <Button
        id={id}
        label={label}
        size='large'
        color={color}
        variant='contained'
        onClick={onClick}
      />
    </Box>
  );
}
