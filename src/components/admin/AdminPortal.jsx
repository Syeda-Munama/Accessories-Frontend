import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Route, Routes, useNavigate } from "react-router-dom";
import UpdateProduct from './UpdateProduct';
import UploadProduct from './UploadProduct';
import OrderedPlaced from './OrderedPlaced';
import UpdateIcon from '@mui/icons-material/Update';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { Cursor, useTypewriter } from "react-simple-typewriter";
import UpdateForm from "./UpdateForm";
import Stock from "./Stock";
import InventoryIcon from '@mui/icons-material/Inventory';

const drawerWidth = 240;

const routes = [
  {
    name: "updateProduct",
    path: "UpdateProduct",
    element: <UpdateProduct />,
    icon: <UpdateIcon />,
  },
  {
    name: "uploadProduct",
    path: "UploadProduct",
    element: <UploadProduct />,
    icon: <DriveFolderUploadRoundedIcon />,
  },
  {
    name: "SellAccessories",
    path: "OrderedPlaced",
    element: <OrderedPlaced />,
    icon: <BorderColorRoundedIcon />,
  },
  {
    name: "AccessoriesStock",
    path: "stock",
    element: <Stock />,
    icon: <InventoryIcon />,
  }
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(true);

  const [text] = useTypewriter({
    words: ["Welcome to the RR Accessories Store", "This is the Admin Portal"],
    loop: {}
  })

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const navigateHandler = (path) => {
    navigate(path);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed"
        sx={{
          backgroundColor: "secondary",
        }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <b>ME Accessories Store</b> (Admin Portal)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((route, index) => (
            <ListItem onClick={() => {
              setPage(false)
            }} key={index} disablePadding>
              <ListItemButton onClick={() => navigateHandler(route.path)}>
                <ListItemIcon>
                  {route.icon}
                </ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <div className='d-flex justify-content-center align-item-center my-3'>
            <button className='btn btn-primary px-3' onClick={() => {
              localStorage.clear()
              navigate('/')
            }}>Logout</button>
          </div>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {page === true ? <h1 className='d-flex justify-content-center align-items-center my-5 fw-bold' style={{ color: "#551ce7" }}>{text}
          <span className="text-danger"><Cursor /></span>
        </h1> : null}
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path='UpdateForm' element={<UpdateForm />} />
        </Routes>
      </Main>
    </Box>
  );
}
