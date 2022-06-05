import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Popper,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  styled,
} from '@mui/material';
import { signOut, useSession } from 'next-auth/react';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CircleIcon from '@mui/icons-material/Circle';
import { ClickAwayListener } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { red } from '@mui/material/colors';

const drawerWidth = 240;
const secAppbarHeight = 64;

const ToolbarOffest = styled('div', { name: 'ToolbarOffest' })(({ theme }) => ({
  ...theme.mixins.toolbar,
  backgroundColor: 'inherit',
}));

const AppBar2 = styled('div', { name: 'AppBar2' })(({ theme }) => ({
  display: 'flex',
  minHeight: secAppbarHeight,
  alignItems: 'center',
  paddingRight: '1.2rem',
}));

const MainContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'drawOpen',
  name: 'MainContent',
})(({ theme, drawOpen }) => ({
  zIndex: '3',
  width: '100%',
  marginRight: drawerWidth,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(drawOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const PageContent = styled('div', { name: 'PageContent' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  height: 'fit-content',
}));

export function Layout2({ children }) {
  // states
  const [drawOpen, setDrawOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  let navigate = () => {};
  const location = () => {};
  const [drawListOpen, setDrawListOpen] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  //
  const { data: session } = useSession();
  const handleDrawer = () => {
    setDrawOpen(!drawOpen);
  };

  const handleAccountOptionsClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const accountOptionsOpen = Boolean(anchorEl);
  const accountOptionsId = accountOptionsOpen ? 'accountOptions' : undefined;

  const handleDrawList = (event, id) =>
    setDrawListOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));

  const menuItems = [
    {
      text: 'تگ',
      id: 1,
      icon: <AddCircleOutlineOutlined color='secondary' />,
      path: false,
      sublists: [
        {
          text: 'تگ جدید',
          icon: <SubjectOutlined color='secondary' />,
        },
        {
          text: 'مشاهده تگ ها',
          icon: <SubjectOutlined color='secondary' />,
        },
      ],
    },
    {
      text: 'اشخاص/اماکن',
      id: 2,
      icon: <AddCircleOutlineOutlined color='secondary' />,
      path: false,
      sublists: [
        {
          text: 'جدید',
          icon: <SubjectOutlined color='secondary' />,
          path: '/newContact',
        },
        {
          text: 'مشاهده موجود',
          icon: <SubjectOutlined color='secondary' />,
          path: '/contacts',
        },
      ],
    },
  ];
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row-reverse', height: '100%' }}
      component='div'
    >
      {/*First Appbar */}
      <AppBar
        elevation={2}
        sx={{ '&.MuiAppBar-root': { backgroundColor: '#304967', zIndex: '4' } }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography sx={{ display: 'inline-block', margin: 1 }}>
            سامانه هوشمند حواس
          </Typography>
          <Stack direction={'row'} spacing={2} alignItems='center'>
            <Typography component={'p'} variant='body1'>
              {(session?.user?.firstName ?? '') +
                ' ' +
                (session?.user?.lastName ?? '')}
            </Typography>
            <Typography
              component={'p'}
              variant='body1'
              sx={{ backgroundColor: 'info.main', p: 1, borderRadius: 1 }}
            >
              {session?.user?.title ?? ''}
            </Typography>
            <IconButton
              id='accountOptionsButton'
              aria-describedby={accountOptionsId}
              onClick={(e) => {
                e.stopPropagation();
                handleAccountOptionsClick(e);
              }}
            >
              <Avatar />
            </IconButton>
            <Menu
              id={accountOptionsId}
              anchorEl={anchorEl}
              open={accountOptionsOpen}
              transition
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={()=>signOut({callbackUrl: "/users/login"})}>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText>خروج</ListItemText>
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <MainContent drawOpen={drawOpen}>
          <ToolbarOffest />

          {/* اطلاعات صفحه */}
          <PageContent>{children}</PageContent>
        </MainContent>
      </ClickAwayListener>
      {/* Drawer */}
      <Drawer
        variant='persistent'
        anchor='left'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth },
          zIndex: 2,
        }}
        open={drawOpen}
      >
        <ToolbarOffest />
        <List
          component='nav'
          sx={{
            '& .MuiListItemButton-root': {
              textAlign: 'left',
            },
          }}
        >
          <ListItemButton
            onClick={() => navigate('/')}
            sx={{
              ...(location.pathname == '/' && {
                backgroundColor: 'blue',
              }),
            }}
          >
            <ListItemIcon sx={{ minWidth: '32px' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='داشبورد' />
          </ListItemButton>
          {/* نشان دادن List */}
          {menuItems.map((item) => (
            <>
              <ListItemButton
                key={item.text}
                onClick={(event) => handleDrawList(event, item.id)}
              >
                <ListItemIcon sx={{ minWidth: '32px' }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={`${item.text}`} />
                <ListItemIcon sx={{ minWidth: '32px' }}>
                  {item.sublists &&
                    (drawListOpen[item.id] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemIcon>
              </ListItemButton>
              {/* نشان دادن SubList */}
              <Collapse in={drawListOpen[item.id]} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                  {item.sublists.map((sublist) => (
                    <>
                      <ListItemButton
                        onClick={() => navigate(sublist.path)}
                        sx={{
                          pr: 6,
                          ...(location.pathname == sublist.path && {
                            backgroundColor: 'blue',
                          }),
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: '32px' }}>
                          <CircleIcon sx={{ fontSize: '1rem' }} />
                        </ListItemIcon>
                        <ListItemText primary={sublist.text} />
                      </ListItemButton>
                    </>
                  ))}
                </List>
              </Collapse>
            </>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{
          margin: 0.2,
          position: 'absolute',
          left: drawOpen ? drawerWidth - 28 : 0,
          transitionProperty: 'left',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'ease-out',
          top: '50%',
          zIndex: 10,
          border: 1,
          backgroundColor: 'secondary.main',
          boxShadow: 10,
        }}
        size='large'
        color='inherit'
        aria-label='drawOpen drawer'
        onClick={handleDrawer}
      >
        {drawOpen ? (
          <ArrowForwardIosRoundedIcon />
        ) : (
          <ArrowBackIosNewRoundedIcon />
        )}
      </IconButton>
    </Box>
  );
}

export default Layout2;
