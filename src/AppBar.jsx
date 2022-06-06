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

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CircleIcon from '@mui/icons-material/Circle';
import { ClickAwayListener } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import React from 'react';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { red } from '@mui/material/colors';
import {useRouter} from "next/router"

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
  // 
  const router = useRouter()
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
      icon: <StyleRoundedIcon />,
      sublists: [
        {
          text: 'تگ جدید',
          icon: <AddCircleOutlineOutlined />,
          path: '/users/newTag',
        },
        {
          text: 'مشاهده تگ ها',
          icon: <RemoveRedEyeRoundedIcon />,
          path: '/users/tags',
        },
      ],
    },
    {
      text: 'اشخاص/اماکن',
      id: 2,
      icon: <PeopleAltRoundedIcon />,
      path: false,
      sublists: [
        {
          text: 'شخص جدید',
          icon: <AddCircleOutlineOutlined />,
          path: '/users/newPerson',
        },
        {
          text: 'مشاهده اشخاص',
          icon: <SearchRoundedIcon />,
          path: '/users/persons',
        },
        {
          text: 'مکان جدید',
          icon: <AddCircleOutlineOutlined />,
          path: '/users/newPlace',
        },
        {
          text: 'مشاهده اماکن',
          icon: <SearchRoundedIcon />,
          path: '/users/places',
        },
      ],
    },
    {
      text: 'تجهیزات / موجودی',
      id: 3,
      icon: <Inventory2RoundedIcon />,
      sublists: [
        {
          text: 'تجهیز جدید',
          icon: <AddCircleOutlineOutlined />,
          path: '/users/newEquipment',
        },
        {
          text: 'مشاهده تجهیزات',
          icon: <SearchRoundedIcon />,
          path: '/users/equipments',
        },
        {
          text: 'موجودی جدید',
          icon: <AddCircleOutlineOutlined />,
          path: '/users/newAsset',
        },
        {
          text: 'مشاهده موجودی',
          icon: <SearchRoundedIcon />,
          path: '/users/assets',
        },
      ],
    },
    {
      text: 'مجوزها',
      id: 4,
      icon: <WorkspacePremiumRoundedIcon />,
      sublists: [
        {
          text: 'درخواست مجوز جدید',
          icon: <AddCircleOutlineOutlined />,
          path: '/newLicense',
        },
        {
          text: 'مجوزهای ثبت شده',
          icon: <SearchRoundedIcon />,
          path: '/users/licenses',
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
              <MenuItem
                onClick={() => signOut({ callbackUrl: '/users/login' })}
              >
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
            onClick={() => router.push('/users/dashboard')}
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
                onClick={(event) => {
                  handleDrawList(event, item.id)
                  if (item?.path) {
                    router.push(item.path)
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: '32px' }}>
                  {item.icon}
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
                      <ListItemButton
                        onClick={() => router.push(sublist.path)}
                        sx={{
                          pl: 6,
                          ...(location.pathname == sublist.path && {
                            backgroundColor: 'blue',
                          }),
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: '32px' }}>
                          {sublist.icon}
                        </ListItemIcon>
                        <ListItemText primary={sublist.text} />
                      </ListItemButton>
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
