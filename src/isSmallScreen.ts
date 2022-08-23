import { useMediaQuery } from '@mui/material';

export default function isSmallScreen() {
  return !useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
}
