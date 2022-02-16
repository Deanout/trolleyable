import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { selectLoading, selectUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const currentUser = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let navLinks;
  if (!!currentUser) {
    navLinks = (
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </div>
    )
  } else {
    navLinks = (
      <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          <Button component={Link} 
            to="/signup" 
            sx={{textDecoration: "none", color:"#FFF", fontSize: "14px" }}>
              Create Account
          </Button>
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
        <Button component={Link} 
          to="/login" 
          sx={{textDecoration: "none", color:"#FFF", fontSize: "14px" }}>
            Login
        </Button>
      </Typography>
    </Box>
    
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1}}>
            <Button component={Link} 
              to="/" 
              sx={{textDecoration: "none", color:"#FFF", fontSize: "18px" }}>
                Trolleyable
            </Button>
          </Typography>
          {loading ? "" : navLinks}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
