import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import auth from "../auth";
import { SearchForm } from "../search";
import { fetchNotifications, updateNotifications } from "./actions";
import { RootState } from "../rootReducer";
import { History } from "history";
import { NotificationType } from "./types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { alpha } from "@mui/material/styles";

type NotificationState = {
  anchorEl: null | HTMLElement;
  mobileMoreAnchorEl: null | HTMLElement;
};

type NotificationProps = PropsFromRedux & {
  history: History;
};

class Navbar extends Component<NotificationProps, NotificationState> {
  constructor(props: NotificationProps) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  }

  componentDidMount() {
    if (this.props.currentUser.isAuthenticated) {
      this.props.fetchNotifications();
    }
  }

  logout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push("/");
  };

  handleNotificationClick = (
    index: number,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    e.preventDefault();
    this.props.updateNotifications(
      this.props.notifications[index].subscriber_id
    );
  };

  handleMenu = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = (): void => {
    this.setState({
      anchorEl: null,
    });
  };

  handleMobileMenuClose = (): void => {
    this.setState({
      mobileMoreAnchorEl: null,
    });
  };

  handleMobileMenuOpen = (e: React.MouseEvent<HTMLElement>): void => {
    this.setState({
      mobileMoreAnchorEl: e.currentTarget,
    });
  };

  mobileMenuId = "navbar-menu-mobile";
  notificationsList: JSX.Element[] = this.props.notifications.map(
    (n: NotificationType, index: number) => (
      <MenuItem
        onClick={(e) => this.handleNotificationClick(index, e)}
        key={n.subscriber_id}
      >
        <span key={n.subscriber_id}>{n.username}</span> started following you!
      </MenuItem>
    )
  );

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: (theme) =>
              alpha(theme.palette.primary.contrastText, 1),
          }}
          position="fixed"
        >
          <Toolbar>
            <Link component={NavLink} underline="none" to="/">
              <BreakfastDiningIcon />
            </Link>
            <SearchForm history={this.props.history} />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {this.props.currentUser.isAuthenticated ? (
                <>
                  <Button color="primary" component={NavLink} to="/">
                    Global
                  </Button>
                  <Button
                    color="primary"
                    component={NavLink}
                    to={`/${this.props.currentUser.user.id}`}
                  >
                    Your Reads
                  </Button>
                  <Button
                    color="primary"
                    component={NavLink}
                    to="/subscriptions"
                  >
                    Friends
                  </Button>
                  <IconButton
                    size="large"
                    aria-label="notifications"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="primary"
                  >
                    <Badge
                      badgeContent={this.notificationsList.length}
                      color="error"
                    >
                      <NotificationsNoneIcon />
                    </Badge>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                    {!this.notificationsList.length ? (
                      <Typography color="primary">
                        No new subscribers!
                      </Typography>
                    ) : (
                      this.notificationsList
                    )}
                  </Menu>
                  <IconButton
                    size="large"
                    aria-label="sign out"
                    onClick={this.logout}
                    color="primary"
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Button color="primary" component={NavLink} to="/signup">
                    Sign up
                  </Button>
                  <Button color="primary" component={NavLink} to="/signin">
                    Log in
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={this.mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={this.state.mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={this.mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(this.state.mobileMoreAnchorEl)}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem>
            <Button color="primary" component={NavLink} to="/">
              Global
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              color="primary"
              component={NavLink}
              to={`/${this.props.currentUser.user.id}`}
            >
              Your Reads
            </Button>
          </MenuItem>
          <MenuItem>
            <Button color="primary" component={NavLink} to="/subscriptions">
              Friends
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="primary"
            >
              <Badge badgeContent={this.notificationsList.length} color="error">
                Notifications
              </Badge>
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              {!this.notificationsList.length ? (
                <Typography color="primary">No new subscribers!</Typography>
              ) : (
                this.notificationsList
              )}
            </Menu>
          </MenuItem>
          <MenuItem>
            <Button onClick={this.logout} color="primary">
              Log out
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    currentUser: state.currentUser,
    notifications: state.notifications,
  };
}

const connector = connect(mapStateToProps, {
  ...auth.actions,
  fetchNotifications,
  updateNotifications,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(Navbar));
