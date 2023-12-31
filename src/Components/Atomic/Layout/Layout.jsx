/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  Divider,
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
  useMediaQuery,
} from '@mui/material';
import React, { memo, useContext, useEffect } from 'react';
import { getCookie, setCookie } from '../../../Cookies';
import { signOut, useSession } from 'next-auth/react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CircleIcon from '@mui/icons-material/Circle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { InfoContext } from '../../../../pages/_app';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Snackbar from '../Snackbar';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { red } from '@mui/material/colors';
import { useRouter } from 'next/router';
import useScreenSize from '../../../Logic/useScreenSize';

export const drawerWidth = 240;
export const secAppbarHeight = 64;

const ToolbarOffest = styled('div', { name: 'ToolbarOffest' })(({ theme }) => ({
  ...theme.mixins.toolbar,
  backgroundColor: 'inherit',
  blockSize: secAppbarHeight
}));

const AppBar2 = styled('nav')({
  display: 'flex',
  minHeight: secAppbarHeight,
  alignItems: 'center',
  paddingRight: '1.2rem',
  background: '#bbc6d4',
  position: 'sticky',
  top: 64,
});

const MainContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'drawOpen',
  name: 'MainContent',
})(({ theme, drawOpen }) => ({
  zIndex: '3',
  width: '100%',
  marginLeft: -drawerWidth,
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
    marginLeft: 0,
  }),
}));
const MainContentMobile = styled('div', {
  shouldForwardProp: (prop) => prop !== 'drawOpen',
  name: 'MainContent',
})(({ theme, drawOpen }) => ({
  zIndex: '3',
  width: '100%',
}));

const PageContent = styled('main', { name: 'PageContent' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  height: 'fit-content',
  padding: 15,
  inlineSize: '100% !important',
}));

function Layout({ children, pageName }) {
  // update page name for appbar2
  // page info context
  const infoContext = useContext(InfoContext);
  useEffect(() => {
    infoContext.changePageName(pageName);
  }, []);
  const router = useRouter();
  // check for expired sessions or not loged-in users ---> redirect to login page
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/users/login');
    },
  });
  // states
  const [drawOpen, setDrawOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //
  const location = () => {};
  const [drawListOpen, setDrawListOpen] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  //
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  useEffect(() => {
    setDrawOpen(
      getCookie('drawOpen') === 'true' || !getCookie('drawOpen') ? true : false
    );
  }, []);
  const { small }  = useScreenSize()
  //
  const handleDrawer = () => {
    setCookie('drawOpen', !drawOpen);
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
      id: 'tag',
      icon: <StyleRoundedIcon />,

      sublists: [
        {
          text: 'تگ جدید',
          icon: <AddCircleOutlineOutlined />,
          path: '/users/newTag',
          roleName: 'createTag',
          id: 'newTag',
        },
        // {
        //   text: 'مشاهده تگ ها',
        //   icon: <RemoveRedEyeRoundedIcon />,
        //   path: '/users/tags',
        //   roleName: 'viewTag',
        // },
      ],
    },
    {
      text: 'نقش ها',
      id: 2,
      icon: <PermIdentityRoundedIcon />,
      path: false,
      sublists: [
        {
          text: 'نقش جدید',
          icon: <AddCircleOutlineOutlined />,
          path: '/users/newRole',
          roleName: 'createRole',
        },
        {
          text: 'مشاهده نقش ها',
          icon: <SearchRoundedIcon />,
          path: '/users/roles',
          roleName: 'viewRole',
        },
      ],
    },
    {
      text: 'اشخاص/اماکن',
      id: 'persons-places',
      icon: <PeopleAltRoundedIcon />,
      path: false,
      sublists: [
        {
          text: 'شخص جدید',
          id: 'newPerson',
          icon: <AddCircleOutlineOutlined />,
          path: '/users/newPerson',
          roleName: 'createPerson',
        },
        {
          text: 'مشاهده اشخاص',
          id: 'persons',
          icon: <SearchRoundedIcon />,
          path: '/users/persons',
          roleName: 'viewPerson',
        },
        // {
        //   text: 'مکان جدید',
        //   icon: <AddCircleOutlineOutlined />,
        //   path: '/users/newPlace',
        //   roleName: 'createPlace',
        // },
        {
          text: 'مشاهده اماکن',
          icon: <SearchRoundedIcon />,
          path: '/users/places',
          roleName: 'viewPlace',
        },
      ],
    },
    {
      text: 'تجهیزات / موجودی',
      id: 'equipments-assets',
      icon: <Inventory2RoundedIcon />,
      sublists: [
        {
          text: 'تجهیز جدید',
          icon: <AddCircleOutlineOutlined />,
          id: 'newEquipment',
          path: '/users/newEquipment',
          roleName: 'createEquipment',
        },
        {
          text: 'مشاهده تجهیزات',
          id: 'equipments',
          icon: <SearchRoundedIcon />,
          path: '/users/equipments',
          roleName: 'viewEquipment',
        },
        {
          text: 'موجودی جدید',
          icon: <AddCircleOutlineOutlined />,
          path: '/users/newAsset',
          roleName: 'createAsset',
        },
        {
          text: 'مشاهده موجودی',
          icon: <SearchRoundedIcon />,
          path: '/users/assets',
          roleName: 'viewAsset',
        },
      ],
    },
    {
      text: 'مجوزها',
      id: 'licences',
      icon: <WorkspacePremiumRoundedIcon />,
      sublistCategoryHeaders: ['ورود', 'خروج'],
      sublists: [
        {
          text: 'تاریخچه گردش کارها',
          icon: <SearchRoundedIcon />,
          path: '/users/workflows',
          roleName: 'deleteLicense',
        },
        {
          text: 'تاریخچه گردش کارها',
          icon: <SearchRoundedIcon />,
          path: '/users/workflowsForCorporationStaff',
          roleName: 'createEnterDeliverExit',
        },
        {
          text: 'ورود به بیمارستان',
          icon: <FileDownloadRoundedIcon />,
          path: '/users/assetEnterWorkflowsTables',
          roleName: 'viewLicense',
          category: 'ورود',
        },

        {
          text: 'خروج از شرکت',
          icon: <FileUploadRoundedIcon />,
          path: '/users/enterWorkflowsTableCorporation',
          roleName: 'createEnterDeliverExit',
          category: 'ورود',
          id: 'enterWorkflows',
        },

        {
          text: 'خروج از بیمارستان',
          icon: <FileUploadRoundedIcon />,
          path: '/users/assetExitWorkflowsTables',
          roleName: 'viewLicense',
          category: 'خروج',
          id: 'exitWorkflows',
        },

        {
          text: 'ورود به شرکت',
          icon: <FileDownloadRoundedIcon />,
          path: '/users/exitWorkflowsTableCorporation',
          roleName: 'createEnterDeliverExit',
          category: 'خروج',
        },
      ],
    },
  ];
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row-reverse', height: '100%' }}
      component='div'
    >
      {/* First Appbar */}
      <AppBar
        sx={{
          blockSize: secAppbarHeight,
          '&.MuiAppBar-root': { backgroundColor: '#304967', zIndex: 6000 },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', blockSize: secAppbarHeight }}>
          <Typography variant='h5' sx={{ display: 'inline-block', margin: 1 }}>
            حواس
          </Typography>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Typography component='p' variant='body1'>
              {session?.user?.firstNameAndLastName ?? ''}
            </Typography>
            <Typography
              component='p'
              variant='body1'
              sx={{ backgroundColor: 'info.main', p: 1, borderRadius: 1 }}
            >
              {session?.user?.role?.name ?? ''}
            </Typography>
            <IconButton
              id='accountOptionsButton'
              aria-label='حساب کاربری'
              aria-describedby={accountOptionsId}
              title='حساب کاربری'
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
                id='settingsButton'
                onClick={() => router.push('/users/settings')}
              >
                <ListItemIcon>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText>تنظیمات</ListItemText>
              </MenuItem>
              <MenuItem
                id='logoutButton'
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
        {isSmallScreen ? (
          <MainContent drawOpen={drawOpen}>
            <ToolbarOffest />
            {/* Secend Appbar */}
            <AppBar2 >
              <IconButton color='primary'>
                <ArrowForwardIcon sx={{ ml: '1rem', fontSize: '1.2rem' }} />
              </IconButton>
              <Typography
                component='h1'
                variant='h5'
                sx={{ fontSize: '1.2rem' }}
              >
                {' '}
                {infoContext?.pageName}
              </Typography>
            </AppBar2>

            {/* اطلاعات صفحه */}
            <PageContent sx={{ inlineSize: 'inherit' }}>{children}</PageContent>
          </MainContent>
        ) : (
          <MainContentMobile drawOpen={drawOpen}>
            <ToolbarOffest />
            {/* Secend Appbar */}
            <AppBar2 sx={{zIndex: 10}}>
              <IconButton color='primary'>
                <ArrowForwardIcon sx={{ ml: '1rem', fontSize: '1.2rem' }} />
              </IconButton>
              <Typography
                component='h1'
                variant='h5'
                sx={{ fontSize: '1.2rem' }}
              >
                {' '}
                {infoContext?.pageName}
              </Typography>
            </AppBar2>

            {/* اطلاعات صفحه */}
            <PageContent sx={{ inlineSize: 'inherit' }}>{children}</PageContent>
          </MainContentMobile>
        )}
      </ClickAwayListener>
      {/* Drawer */}
      <Drawer
        variant='persistent'
        anchor='left'
        sx={{
          width: 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth },
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
            onClick={() => {
              router.push('/users/dashboard');
            }}
            sx={{
              ...(location.pathname === '/' && {
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
          {menuItems.map((item) =>
            item.sublists.filter((s) => session?.user?.role?.[s.roleName])
              .length > 0 ? (
              <Box id={item?.id} key={item.text}>
                <ListItemButton
                  onClick={(event) => {
                    handleDrawList(event, item.id);
                    if (item?.path) {
                      router.push(item.path);
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
                <Collapse
                  in={drawListOpen[item.id]}
                  timeout='auto'
                  unmountOnExit
                >
                  <List component='div' disablePadding>
                    {item.sublists
                      .filter((s) => session?.user?.role?.[s.roleName])
                      .filter((sublist) => !sublist.category)
                      .map((sublist) => (
                        <ListItemButton
                          id={sublist?.id}
                          key={sublist.text}
                          onClick={() => {
                            router.push(sublist.path);
                          }}
                          sx={{
                            pl: 6,
                            ...(location.pathname === sublist.path && {
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
                    {item?.sublistCategoryHeaders
                      ? item?.sublistCategoryHeaders?.map((ch, i) => (
                          <>
                            {/* <ListItemText sx={{ textAlign: 'center' }}>
                              {ch}
                            </ListItemText> */}

                            <Divider />
                            {item.sublists
                              .filter((sublist) => sublist.category === ch)
                              .map((sublist) =>
                                session?.user?.role?.[sublist.roleName] ? (
                                  <ListItemButton
                                    id={sublist?.id}
                                    key={sublist.text}
                                    onClick={() => {
                                      router.push(sublist.path);
                                    }}
                                    sx={{
                                      pl: 6,
                                      ...(location.pathname ===
                                        sublist.path && {
                                        backgroundColor: 'blue',
                                      }),
                                    }}
                                  >
                                    <ListItemIcon sx={{ minWidth: '32px' }}>
                                      {sublist.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={sublist.text} />
                                  </ListItemButton>
                                ) : null
                              )}
                          </>
                        ))
                      : null}
                  </List>
                </Collapse>
              </Box>
            ) : null
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{
          margin: 0.2,
          position: 'fixed',
          left: drawOpen ? drawerWidth - 28 : 0,
          transitionProperty: 'left',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'ease-out',
          top: 'calc(0.5 * 100vh)',
          zIndex: 6000,
          border: 1,
          backgroundColor: 'secondary.main',
          boxShadow: 1,
          blockSize: 50,
          inlineSize: 50,
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
      <Snackbar />
    </Box>
  );
}

export default memo(Layout);
