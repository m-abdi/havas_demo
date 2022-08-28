import { useMediaQuery } from '@mui/material';

export default function useScreenSize() {
  return {
    small: !useMediaQuery((theme: any) => theme.breakpoints.up('sm')),
    medium: !useMediaQuery((theme: any) => theme.breakpoints.up('md')),
    large: !useMediaQuery((theme: any) => theme.breakpoints.up('lg')),
  };
}
