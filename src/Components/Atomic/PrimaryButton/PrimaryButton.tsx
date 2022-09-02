import { Box, Fab, Toolbar, useMediaQuery } from '@mui/material';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button } from '../Button';
import React from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import useScreenSize from '../../../Logic/useScreenSize';

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
  top,
  title,
  modal =false
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
  top: number;
  modal?: boolean;
  disabled?: boolean;
  title?: string;
  size?: 'small' | 'large' | 'medium';
}) {
  const { small, medium } = useScreenSize();
  return !medium ? (
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
        position: modal ? "static" : 'absolute',
        top: top,
        right: right,
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
        title={title}
      />
    </Box>
  );
}
