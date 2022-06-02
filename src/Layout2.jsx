import { AppBar, Box, Collapse, createTheme, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, styled, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { red } from '@mui/material/colors';

const theme = createTheme({
  mixins:{
    toolbar:{
      minHeight:'50px'
    }
  },
  components:{
    MuiInputBase:{
      styleOverrides:{
        root:{
          height:'35px'
        },
        input:{
          height:'0px',
          fontSize:'0.9em'
        }
      }
    }
  }
})

const drawerWidth = 240;
const secAppbarHeight = 64

const ToolbarOffest = styled('div',{name:'ToolbarOffest',})(({ theme }) => ({
  ...theme.mixins.toolbar,
  backgroundColor: 'inherit',
}));

const AppBar2 = styled('div',{name:'AppBar2',})(({ theme }) => ({
  display:'flex',
  minHeight: secAppbarHeight,
  alignItems:'center',
  paddingRight:'1.2rem'
}));

const MainContent = styled("div", {shouldForwardProp: (prop) => prop !== 'drawOpen', name:'MainContent'})
(({ theme, drawOpen }) => ({
  zIndex:'3',
  width: '100%',
  marginRight: -drawerWidth,
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

const PageContent = styled('div',{name:'PageContent',})(({ theme 
}) => ({
  display:'flex',
  justifyContent:'center',  
  height:'fit-content',
}));

export function Layout2({ children }) {
  const [drawOpen, setDrawOpen] = React.useState(true);
  let navigate = ()=>{}
  const location = ()=>{}
  const [drawListOpen, setDrawListOpen] = React.useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const handleDrawer = () => {setDrawOpen(!drawOpen)};

  const handleDrawList= (event, id) =>(
      setDrawListOpen(prevState => ({...prevState, [id]: !prevState[id]}))
  );
  
  const menuItems = [
    { 
      text: 'تگ',
      id: 1, 
      icon: <AddCircleOutlineOutlined color="secondary" />, 
      path: false,
      sublists:[{
        text:'تگ جدید',
        icon:<SubjectOutlined color="secondary" />,
      },
      {
        text:'مشاهده تگ ها',
        icon:<SubjectOutlined color="secondary" />,
      }]
    },
    { 
      text: 'اشخاص/اماکن',
      id: 2,
      icon: <AddCircleOutlineOutlined color="secondary" />, 
      path: false,
      sublists:[{
        text:'جدید',
        icon:<SubjectOutlined color="secondary" />,
        path: '/newContact'
      },
      {
        text:'مشاهده موجود',
        icon:<SubjectOutlined color="secondary" />,
        path: '/contacts'
      }]
    },
  ];
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', flexDirection: 'row-reverse',height:'100%', }} component='div'>
        {/*First Appbar */}
        <AppBar elevation={0} sx={{'&.MuiAppBar-root':{backgroundColor:'#304967'
      , zIndex:'4'}}}>
          <Toolbar>
          <Typography sx={{display:'inline-block' , margin: 1}}>
                حواس 1
              </Typography>
              <IconButton sx={{margin: 0.2}} color="inherit"
              aria-label="drawOpen drawer" onClick={handleDrawer}>
              <MenuIcon />
              </IconButton>
          </Toolbar>
        </AppBar>

        <MainContent drawOpen={drawOpen}>
          <ToolbarOffest/>
          
          {/*Secend Appbar */}
          <AppBar2 sx={{position:'sticky', background:'#bbc6d4'}}>
            <IconButton color="primary">
              <ArrowForwardIcon sx={{ml:'1rem', fontSize:'1.2rem'}}/>
            </IconButton >
            <Typography sx={{fontSize:'1.2rem'}}> اسم صفحه</Typography>
          </AppBar2>

          {/* اطلاعات صفحه */}
          <PageContent>
            {children}
          </PageContent>
        </MainContent>

        {/* Drawer */}
        <Drawer  variant='persistent' anchor="right"
          sx={{ width: drawerWidth, flexShrink: 0,
          '& .MuiDrawer-paper': {width: drawerWidth,},
          zIndex:2}} open={drawOpen}>
          <ToolbarOffest/>
          <List component="nav" sx={{'& .MuiListItemButton-root':{
            textAlign:'right'}}}>
            <ListItemButton onClick={()=>navigate("/")}
            sx={{...(location.pathname=='/'&&{
              backgroundColor:'blue'})}}>
                <ListItemIcon sx={{minWidth:'32px'}}><DashboardIcon/></ListItemIcon>
                <ListItemText primary='داشبورد'/> 
            </ListItemButton>
            {/* نشان دادن List */}
            {menuItems.map((item)=>(
              <>
              <ListItemButton key={item.text} onClick={(event)=>handleDrawList(
                event, item.id)}>
                <ListItemIcon sx={{minWidth:'32px'}}><DashboardIcon/></ListItemIcon>
                <ListItemText primary={`${item.text}`}/>
                <ListItemIcon sx={{minWidth:'32px'}}>{item.sublists&&(
                  drawListOpen[item.id] ? <ExpandLess /> : <ExpandMore />
                )}
                </ListItemIcon>
              </ListItemButton>
              {/* نشان دادن SubList */}
              <Collapse in={drawListOpen[item.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>  
                {item.sublists.map((sublist)=>(
                <>
                <ListItemButton onClick={()=>navigate(sublist.path)} sx={{
                  pr: 6, ...(location.pathname==sublist.path&&{
                      backgroundColor:'blue'
                    })}}>
                  <ListItemIcon sx={{minWidth:'32px'}}>
                  <CircleIcon sx={{fontSize:'1rem'}} />
                  </ListItemIcon>
                  <ListItemText primary={sublist.text}/>
                </ListItemButton>
                </>
                ))}
                </List>
              </Collapse>
              </>
            ))}
          </List>
        </Drawer>

    </Box>
    </ThemeProvider>
  )
}

export default Layout2