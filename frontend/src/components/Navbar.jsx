import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

export default function MenuAppBar({ setGptVersion }) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value = null) => {
    if (value) setGptVersion(value);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        {auth && (
            <div style={{textAlign: "right"}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <img
                  src="./gpt_logo.png"
                  style={{ width: "1.5vw", paddingRight: "1.5vw" }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose("3.5")}>GPT 3.5</MenuItem>
                <Tooltip title='Not supported yet.'>
                  <MenuItem>GPT 4.0</MenuItem>
                </Tooltip>
              </Menu>
            </div>
          )}
          <Link sx={{ flexGrow: 1 }} style={{textDecoration: 'none', color: 'white', marginRight: '1.5vw'}} to='/'>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GPT Logs Generator
          </Typography>
          </Link>

          <Link sx={{ flexGrow: 1 }} style={{textDecoration: 'none', color: 'white', marginRight: '1.5vw'}} to='/examples'>
            <Typography variant="h6" component="div" style={{textDecoration: 'none', color: 'white'}}>
              Examples
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
