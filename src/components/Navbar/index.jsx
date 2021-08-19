import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { authStates, withAuth } from "../auth";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import { signOut } from "../../utils/firebase";
import "../All.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menu: {
    flexGrow: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: 20,
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const [open, setOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl1);
  useEffect(() => {
    const setResponsive = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsive();
    window.addEventListener("resize", () => setResponsive());
  }, []);

  const handleSignOut = () => {
    signOut()
      .then(() => {
        console.log("Signed Out");
      })
      .catch((e) => {
        console.log("Error signing out", e);
      });
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl1(null);
    handleSignOut();
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Wyloguj</MenuItem>
    </Menu>
  );

  const displayMobile = () => {
    return (
      <Toolbar className="tool">
        <div className={classes.menu}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleDrawerOpen}
            aria-label="menu"
          >
            <MenuIcon onClick={handleClick} />
          </IconButton>
          <Drawer variant="persistent" anchor="top" open={open}>
            <Link to="/">
              <MenuItem onClick={handleDrawerClose}>Wstęp</MenuItem>
            </Link>
            <Link to="/funkcje/znajdz">
              <MenuItem onClick={handleDrawerClose}>Znajdź przepis</MenuItem>
            </Link>
            <Link to="/funkcje/jak">
              <MenuItem onClick={handleDrawerClose}>Jak ugotować</MenuItem>
            </Link>
            <Link to="/funkcje/znajdz/przepisy">
              <MenuItem onClick={handleDrawerClose}>
                Wszystkie przepisy
              </MenuItem>
              <Link to="/minutnik">
                <MenuItem onClick={handleDrawerClose}>Minutnik</MenuItem>
              </Link>
            </Link>
            <Link to="/logowanie">
              <MenuItem onClick={handleDrawerClose}>Zaloguj</MenuItem>
            </Link>
            <Link to="/rejestracja">
              <MenuItem onClick={handleDrawerClose}>Zarejestruj</MenuItem>
            </Link>
          </Drawer>
        </div>
      </Toolbar>
    );
  };

  const displayDesktop = () => {
    return (
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link to="/">
            <Button style={{ color: "white" }} variant="primary">
              Wstęp
            </Button>
          </Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link to="/funkcje/znajdz">
            <Button style={{ color: "white" }} variant="primary">
              Znajdź przepis
            </Button>
          </Link>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Link to="/funkcje/jak">
            <Button style={{ color: "white" }} variant="primary">
              Jak ugotować
            </Button>
          </Link>
        </Typography>
        <Typography>
          <Button style={{ color: "white" }} component={Link} to="/minutnik">
            Minutnik
          </Button>
        </Typography>

        <Typography variant="h6" className={classes.title}>
          <Link to="/funkcje/znajdz/przepisy">
            <Button style={{ color: "white" }} variant="primary">
              Wszystkie przepisy
            </Button>
          </Link>
        </Typography>

        <div className="user">
          {props.authState === authStates.LOGGED_IN ? (
            <IconButton
              edge="end"
              style={{ right: "40px" }}
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ) : null}
        </div>
        {renderMenu}
      </Toolbar>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </div>
  );
};

export default withAuth(NavBar);
