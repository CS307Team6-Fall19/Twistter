import React from "react";
import "./TopBar.css";
import logo from "../logo192.png";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChatIcon from "@material-ui/icons/Chat";
import { green, blue, purple } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: "#1F3648"
    // "&:hover": {
    //   backgroundColor: blue[700]
    // }
  }
}))(IconButton);

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: "#1F3648"
    }
  }
});

const TopBarTwisster = ({ goLogout, goToProfile, goToChat, goToLanding }) => {
  return (
    <div className="inner-body">
      <label className="top-bar-twisster">Twistter</label>
      {/* <button className="top-bar-logout" id="logout" onClick={goLogout}>
        Logout
      </button> */}

      <div className="top-bar-chat">
        <ColorButton
          size="medium"
          aria-label="chat"
          id="chat"
          onClick={goToChat}
          className="top-bar-chat-btn"
        >
          <ChatIcon fontSize="large" />
        </ColorButton>
      </div>
      <div className="top-bar-profile">
        <ColorButton
          size="medium"
          aria-label="profile"
          id="profile"
          onClick={goToProfile}
        >
          <AccountCircleIcon fontSize="large" />
        </ColorButton>
      </div>
      <div className="top_bar_home">
        <ColorButton
          size="medium"
          aria-label="home"
          id="Home"
          onClick={goToLanding}
        >
          <HomeIcon fontSize="large" />
        </ColorButton>
      </div>
      {/* <button className="top_bar_home" id="Home" onClick={goToLanding}>
        Home
      </button> */}
    </div>
  );
};
export default TopBarTwisster;
